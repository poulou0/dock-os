const fs = require('fs');
const {exec} = require("child_process");
const https = require('https');
const http = require('http');
const url = require("url");
let paths = [];
fs.readdirSync("../plugins/")
  .map((v) => "../plugins/" + v)
  .map((f)=> fs.existsSync(f + "/paths.js") ? f+ "/paths.js" : "")
  .filter((f) => f.length)
  .forEach((file) => {
    paths.push(require(file));
  })

const dotenv = require('dotenv');
dotenv.config({path:__dirname+'/../.env'});

const host = '0.0.0.0';
const port = 443;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const ROOT_DIR = process.env.USER_HOME + '/custom-nas';

const requestListener = function (req, res) {
  const { pathname, query } = url.parse(req.url);
  for (const mod of paths) {
    for (const path of Object.keys(mod)) {
      if (pathname === mod[path].pathname) {
        exec('sshpass -p ' + PASSWORD + ' ssh host.docker.internal -l ' + USER + ' -oStrictHostKeyChecking=accept-new "echo ' + PASSWORD + ' | '
            +  'sudo -S bash -c \''
              + (query ? query : '') + ' ' + mod[path].commands({ROOT_DIR}).join(' && ' + (query ? query : '') + ' ')
            + '\'"', () => {
          res.writeHead(302, {location: "/"});
          res.end();
        });
      }
    }
  }

  switch (pathname) {
    case "/favico.ico":
    case "/favicon.ico":
      fs.promises.readFile(__dirname + '/favicon.png')
        .then(contents => {
          res.setHeader("Content-Type", "image/x-icon");
          res.writeHead(200);
          res.end(contents);
        })
      break
    case "/dashboard.css":
      fs.promises.readFile(__dirname + '/dashboard.css')
        .then(contents => {
          res.setHeader("Content-Type", "text/css");
          res.writeHead(200);
          res.end(contents);
        })
      break
    case "/sidebar.html":
      const sidebar_html_files = fs.readdirSync("../plugins/")
        .map((v) => "../plugins/" + v)
        .map((f)=> fs.existsSync(f + "/sidebar.html") ? "<li>" + fs.readFileSync(f+ "/sidebar.html") + "</li>" : "")
        .join("");
      res.setHeader("Content-Type", "text/html");
      res.writeHead(200);
      res.end(sidebar_html_files);
      break
    case "/widgets.html":
      const widgets_html_files = fs.readdirSync("../plugins/")
        .map((v) => "../plugins/" + v)
        .map((f)=> fs.existsSync(f + "/widgets.html") ? fs.readFileSync(f+ "/widgets.html") : "")
        .join("");
      res.setHeader("Content-Type", "text/html");
      res.writeHead(200);
      res.end(widgets_html_files);
      break
    case "/footer-plugins.js":
      const footer_js_files = fs.readdirSync("../plugins/")
        .map((v) => "../plugins/" + v)
        .map((f)=> fs.existsSync(f + "/footer.js") ? fs.readFileSync(f+ "/footer.js") : "")
        .join("");
      res.setHeader("Content-Type", "text/javascript");
      res.writeHead(200);
      res.end(footer_js_files);
      break
    case "/":
      fs.promises.readFile(__dirname + "/index.html")
        .then(contents => {
          res.setHeader("Content-Type", "text/html");
          res.writeHead(200);
          res.end(contents);
        })
      break
    case "/minidlna-rescan":
      // https://serverfault.com/a/512220 + https://askubuntu.com/a/123080
      exec('sshpass -p ' + PASSWORD + ' ssh host.docker.internal -l ' + USER + ' -oStrictHostKeyChecking=accept-new "echo ' + PASSWORD + ' | sudo -S docker exec minidlna /bin/bash -c \'minidlnad -r\'"');
      res.writeHead(302, {location: "/"});
      res.end();
      break
    case "/docker-ps":
      res.setHeader("Content-Type", "application/json");
      exec('sshpass -p ' + PASSWORD + ' ssh host.docker.internal -l ' + USER + ' -oStrictHostKeyChecking=accept-new "echo ' + PASSWORD + ' | sudo -S docker ps --format \'table {{.Names}}\t{{.Status}}\t{{.Ports}}\'"',
        (error, stdout, stderr) => {
          if (error) return console.error(`exec error: ${error}`);
          res.end(JSON.stringify({result: `${stdout}`}));
        })
      break
    case "/df-h":
      res.setHeader("Content-Type", "application/json");
      exec('sshpass -p ' + PASSWORD + ' ssh host.docker.internal -l ' + USER + ' -oStrictHostKeyChecking=accept-new "df -H -t ext4 -t fuseblk --output=target,size,used,avail,pcent"',
        (error, stdout, stderr) => {
          if (error) return console.error(`exec error: ${error}`);
          res.end(JSON.stringify({result: `${stdout}`}));
        })
      break
    case "/shutdown":
      exec('sshpass -p ' + PASSWORD + ' ssh host.docker.internal -l ' + USER + ' -oStrictHostKeyChecking=accept-new "echo ' + PASSWORD + ' | '
        +  'sudo -S bash -c \'shutdown now\'"');
      res.writeHead(302, {location: "/"});
      res.end();
      break
  }
}

https
  .createServer({key: fs.readFileSync('cert/self-signed.key'), cert: fs.readFileSync('cert/self-signed.crt')}, requestListener)
  .listen(port, host, () => {
    console.log(`Server is running on https://${host}:${port}`);
  });

// https://newbedev.com/automatic-https-connection-redirect-with-node-js-express
http
  .createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
  })
  .listen(80);
