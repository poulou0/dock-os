const fs = require('fs');
const {exec, spawn} = require("child_process");
const http = require('http');

const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const ROOT_DIR = process.env.ROOT_DIR;
const BASIC_ACCESS_AUTHENTICATION = ['true', '1'].includes(process.env.BASIC_ACCESS_AUTHENTICATION);

// paths looks like: [
//   { pathname: '/duplicati-start', commands: [Function: commands] },
//   { pathname: '/emby-start', commands: [Function: commands] },
//   { pathname: '/esphome-remove', commands: [Function: commands] },
//   ...
// ]
const paths = fs.readdirSync("../plugins/")
  .map((f) => `../plugins/${f}/paths.js`)
  .filter((f) => fs.existsSync(f))
  .map((f) => require(f))
  .flatMap((obj) => Object.values(obj));

const requestListener = (req, res) => {
  if (BASIC_ACCESS_AUTHENTICATION
    && req.headers.authorization !== "Basic " + Buffer.from(`${USER}:${PASSWORD}`).toString("base64")
  ) {
    res.setHeader("WWW-Authenticate", 'Basic realm="User Visible Realm"');
    res.writeHead(401);
    return res.end();
  }

  const { pathname, searchParams } = new URL(req.url, `https://${req.headers.host}`);
  const ENV_VARS = Array.from(searchParams.entries()).map((param) => `${param[0]}=${param[1]}`).join(" ");

  for (const path of paths) {
    if (pathname === path.pathname) {
      var child = spawn(`sshpass -p ${PASSWORD} ssh host.docker.internal -l ${USER} -oStrictHostKeyChecking=accept-new "echo ${PASSWORD} | sudo -S bash -c '
        ${ENV_VARS} ${path.commands({ROOT_DIR}).join(` && ${ENV_VARS} `)}
      '"`, { shell: true });
      child.stdout.setEncoding('utf8');
      child.stdout.on('data', (data) => {
        fs.writeFileSync('./ui-log.txt', `# ${(new Date()).toISOString()}\n# ${ENV_VARS} ${path.commands({ROOT_DIR}).join(`\\n#   && ${ENV_VARS} `)}\n\n` + data.toString());
      });
      child.stderr.on('data', (data) => {
        fs.writeFileSync('./ui-log.txt', `# ${(new Date()).toISOString()}\n# ${ENV_VARS} ${path.commands({ROOT_DIR}).join(`\\n#   && ${ENV_VARS} `)}\n\n` + data.toString());
      });
      child.on('close', (code) => {
        fs.appendFileSync('./ui-log.txt', `\nProcess exited with code ${code}\n`);
        res.writeHead(302, {location: "/"});
        res.end();
      });
      
      // // Write the command to the log
      // exec(`sshpass -p ${PASSWORD} ssh host.docker.internal -l ${USER} -oStrictHostKeyChecking=accept-new "printf \\"`
      //   + '\\n\\n###########################\\n'
      //   + `# ${(new Date()).toISOString()}\\n`
      //   + '# Running commands:\\n'
      //   + `#  ${ENV_VARS} ${path.commands({ROOT_DIR}).join(`\\n#   && ${ENV_VARS} `)}\\n`
      //   + `\\" >> ${ROOT_DIR}/nodejs/ui-log.txt"`
      // );

      // // Write the output of the command to the log
      // exec(`sshpass -p ${PASSWORD} ssh host.docker.internal -l ${USER} -oStrictHostKeyChecking=accept-new "echo ${PASSWORD} | sudo -S bash -c '
      //   ${ENV_VARS} ${path.commands({ROOT_DIR}).join(` && ${ENV_VARS} `)} 2>&1
      // ' >> ${ROOT_DIR}/nodejs/ui-log.txt"`, () => {
      //   res.writeHead(302, { location: "/" });
      //   res.end();
      // });

      return; // if the pathname is found in the plugins, we don't have to check in the switch below
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
        .map((f) => `../plugins/${f}/sidebar.html`)
        .filter((f)=> fs.existsSync(f))
        .map((f)=> `<li>${fs.readFileSync(f)}</li>`)
        .join("");
      res.setHeader("Content-Type", "text/html");
      res.writeHead(200);
      res.end(sidebar_html_files);
      break
    case "/widgets.html":
      const widgets_html_files = fs.readdirSync("../plugins/")
        .map((f) => `../plugins/${f}/widgets.html`)
        .filter((f)=> fs.existsSync(f))
        .map((f)=> fs.readFileSync(f))
        .join("");
      res.setHeader("Content-Type", "text/html");
      res.writeHead(200);
      res.end(widgets_html_files);
      break
    case "/footer-plugins.js":
      const footer_js_files = fs.readdirSync("../plugins/")
        .map((f) => `../plugins/${f}/footer.js`)
        .filter((f)=> fs.existsSync(f))
        .map((f)=> fs.readFileSync(f))
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
    case "/manifest.json":
      fs.promises.readFile(__dirname + "/manifest.json")
        .then(contents => {
          res.setHeader("Content-Type", "application/json");
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
    case "/prune":
      exec('sshpass -p ' + PASSWORD + ' ssh host.docker.internal -l ' + USER + ' -oStrictHostKeyChecking=accept-new "printf '
        + '\\"\\n\\n###########################\\n# ' + (new Date()).toISOString() + '\\n# Running commands:\\n#   '
        + 'docker system prune --all --force'
        + '\\n\\n\\" >> ' + ROOT_DIR + '/nodejs/ui-log.txt"');
      exec('sshpass -p ' + PASSWORD + ' ssh host.docker.internal -l ' + USER + ' -oStrictHostKeyChecking=accept-new "echo ' + PASSWORD + ' | '
        + 'sudo -S bash -c \''
        + 'docker system prune --all --force'
        + ' 2>&1\' >> ' + ROOT_DIR + '/nodejs/ui-log.txt"', () => {
        res.writeHead(302, {location: "/"});
        res.end();
      });
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
    // case "/ui-log.txt/tail":
    //   res.setHeader("Content-Type", "text/plain");
    //   exec('tail ui-log.txt',
    //     (error, stdout, stderr) => {
    //       if (error) return console.error(`exec error: ${error}`);
    //       res.end(stdout);
    //     })
    //   break
    case "/ui-log.txt":
      res.setHeader("Content-Type", "text/plain");
      const buffer = fs.readFileSync("ui-log.txt");
      res.end(buffer.toString());
      break
    case "/wud/api/containers":
      exec(`curl -u "${USER}:${PASSWORD}" http://whatsupdocker:3000/api/containers`, (error, stdout, stderr) => {
        if (error) return console.error(`exec error: ${error}`);
        res.end(stdout);
      });
      break
  }
}

const server = http.createServer(requestListener);
server.timeout = 0;
server.requestTimeout = 0;
server.listen(80);
