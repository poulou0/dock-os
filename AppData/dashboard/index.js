const fs = require('fs');
const {exec} = require("child_process");
const https = require('https');
const http = require('http');

const host = '0.0.0.0';
const port = 443;
const USER = 'pi';
const PASSWORD = 'raspberry';
const ROOT_DIR = '/home/pi/custom-nas';

const requestListener = function (req, res) {
  switch (req.url) {
    case "/favico.ico":
    case "/favicon.ico":
      fs.promises.readFile(__dirname + '/favicon.png')
        .then(contents => {
          res.setHeader("Content-Type", "text/html");
          res.writeHead(200);
          res.end(contents);
        })
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
      exec('sshpass -p ' + PASSWORD + ' ssh host.docker.internal -l ' + USER + ' -oStrictHostKeyChecking=accept-new "echo ' + PASSWORD + ' | sudo docker exec $(sudo -S docker ps --format=\'{{.Names}}\' --filter name=\'.*minidlna.*\') /bin/bash -c \'minidlnad -r\'"');
      res.writeHead(302, {location: "/"});
      res.end();
      break
    case "/docker-ps":
      res.setHeader("Content-Type", "application/json");
      exec('sshpass -p ' + PASSWORD + ' ssh host.docker.internal -l ' + USER + ' -oStrictHostKeyChecking=accept-new "echo ' + PASSWORD + ' | sudo -S docker ps --format \'table {{.Image}}\t{{.Status}}\'"',
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
    case "/pihole-enable":
      res.setHeader("Content-Type", "application/json");
      exec('sshpass -p ' + PASSWORD + ' ssh host.docker.internal -l ' + USER + ' -oStrictHostKeyChecking=accept-new "echo ' + PASSWORD + ' | sudo -S bash -c \'systemctl disable systemd-resolved && systemctl stop systemd-resolved && docker-compose -f ' + ROOT_DIR + '/AppData/pihole/docker-compose.yml up -d\'"',
        (error, stdout, stderr) => {
          if (error) return console.error(`exec error: ${error}`);
          res.writeHead(302, {location: "/"});
          res.end();
        })
      break
    case "/pihole-disable":
      res.setHeader("Content-Type", "application/json");
      exec('sshpass -p ' + PASSWORD + ' ssh host.docker.internal -l ' + USER + ' -oStrictHostKeyChecking=accept-new "echo ' + PASSWORD + ' | sudo -S bash -c \'docker-compose -f ' + ROOT_DIR + '/AppData/pihole/docker-compose.yml down && sudo systemctl enable systemd-resolved && sudo systemctl start systemd-resolved\'"',
        (error, stdout, stderr) => {
          if (error) return console.error(`exec error: ${error}`);
          res.writeHead(302, {location: "/"});
          res.end();
        })
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
