const fs = require('fs');
const {exec, spawn} = require("child_process");
const https = require('https');
const http = require('http');
const url = require("url");

const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const ROOT_DIR = process.env.ROOT_DIR;
const host = '0.0.0.0';
const port = 443;

let paths = [];
fs.readdirSync("../plugins/")
  .map((v) => "../plugins/" + v)
  .map((f) => fs.existsSync(f + "/paths.js") ? f + "/paths.js" : "")
  .filter((f) => f.length)
  .forEach((file) => {
    paths.push(require(file));
  });

const requestListener = function (req, res) {
  if (req.headers.authorization !== "Basic " + Buffer.from(`${USER}:${PASSWORD}`).toString("base64")) {
    res.setHeader("WWW-Authenticate", 'Basic realm="User Visible Realm"');
    res.writeHead(401);
    return res.end();
  }

  let { pathname, query } = url.parse(req.url);
  query = query?.replaceAll('&', ' ');
  for (const mod of paths) {
    for (const path of Object.keys(mod)) {
      if (pathname === mod[path].pathname) {
        // var child = spawn('sshpass', [
        //   '-p', PASSWORD,
        //   'ssh', USER + '@host.docker.internal',
        //   '-o', 'StrictHostKeyChecking=no',
        //   '"\"echo ' + PASSWORD + ' | sudo -S bash -c \'' +
        //     (query || '') + ' ' + mod[path].commands({ROOT_DIR}).join(' && ' + (query || '') + ' ') +
        //   ' 2>&1\' >> '+ROOT_DIR+'/last-output.txt\""',
        // ]);
        // child.stdout.setEncoding('utf8');
        // child.stdout.on('data', (data) => {
        //   console.log(data.toString());
        //   fs.appendFile('./last-output.txt', data.toString());
        // });
        // child.stdout.on('close', function() {
        //   res.writeHead(302, {location: "/"});
        //   res.end();
        // });
        exec('sshpass -p ' + PASSWORD + ' ssh host.docker.internal -l ' + USER + ' -oStrictHostKeyChecking=accept-new "printf '
          + '\\"\\n\\n###########################\\n# ' + (new Date()).toISOString() + '\\n# Running commands:\\n#   '
          + (query || '') + ' ' + mod[path].commands({ROOT_DIR}).join('\\n#   && ' + (query || '') + ' ')
          + '\\n\\n\\" >> ' + ROOT_DIR + '/ui-log.txt"');
        exec('sshpass -p ' + PASSWORD + ' ssh host.docker.internal -l ' + USER + ' -oStrictHostKeyChecking=accept-new "echo ' + PASSWORD + ' | '
          + 'sudo -S bash -c \''
          + (query ? query : '') + ' ' + mod[path].commands({ROOT_DIR}).join(' && ' + (query ? query : '') + ' ')
          + ' 2>&1\' >> ' + ROOT_DIR + '/ui-log.txt"', () => {
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
    case "/restart":
      exec('sshpass -p ' + PASSWORD + ' ssh host.docker.internal -l ' + USER + ' -oStrictHostKeyChecking=accept-new "echo ' + PASSWORD + ' | sudo -S bash -c \'reboot\'"');
      res.writeHead(302, {location: "/"});
      res.end();
      break
    case "/shutdown":
      exec('sshpass -p ' + PASSWORD + ' ssh host.docker.internal -l ' + USER + ' -oStrictHostKeyChecking=accept-new "echo ' + PASSWORD + ' | sudo -S bash -c \'shutdown now\'"');
      res.writeHead(302, {location: "/"});
      res.end();
      break
    case "/ui-log.txt/tail":
      res.setHeader("Content-Type", "text/plain");
      exec('tail ../ui-log.txt',
        (error, stdout, stderr) => {
          if (error) return console.error(`exec error: ${error}`);
          res.end(stdout);
        })
      break
    case "/ui-log.txt":
      res.setHeader("Content-Type", "text/plain");
      const buffer = fs.readFileSync("../ui-log.txt");
      res.end(buffer.toString());
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
