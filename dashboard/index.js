const {exec} = require("child_process");
const fs = require('fs').promises;
const http = require("http");
const host = '0.0.0.0';
const port = 8000

const requestListener = function (req, res) {
  switch (req.url) {
    case "/favico.ico":
    case "/favicon.ico":
      fs.readFile(__dirname + '/favicon.png')
        .then(contents => {
          res.setHeader("Content-Type", "text/html");
          res.writeHead(200);
          res.end(contents);
        })
      break
    case "/":
      fs.readFile(__dirname + "/index.html")
        .then(contents => {
          res.setHeader("Content-Type", "text/html");
          res.writeHead(200);
          res.end(contents);
        })
      break
    case "/minidlna-rescan":
      exec('sudo docker exec $(docker ps --format="{{.Names}}" --filter name=".*minidlna.*") /bin/bash -c "minidlnad -r"');
      res.writeHead(302, {location: "/"});
      res.end();
      break
    case "/docker-ps":
      res.setHeader("Content-Type", "application/json");
      exec('sudo docker ps --format "table {{.Image}}\t{{.Status}}"',
        (error, stdout, stderr) => {
          if (error) return console.error(`exec error: ${error}`);
          res.end(JSON.stringify({result: `${stdout}`}));
        })
      break
    case "/df-h":
      res.setHeader("Content-Type", "application/json");
      exec('sudo df -H -t ext4 -t fuseblk --output=target,size,used,avail,pcent',
        (error, stdout, stderr) => {
          if (error) return console.error(`exec error: ${error}`);
          res.end(JSON.stringify({result: `${stdout}`}));
        })
      break
  }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
