module.exports = {
  enable: {
    pathname: "/onlyoffice-start",
    commands: ({ROOT_DIR}) => {
      return [
        "mkdir -p " + ROOT_DIR + "/plugins/onlyoffice/var/www/onlyoffice/Data/certs",
        "openssl req -new -newkey rsa:4096 -days 3650 -nodes -x509 -subj '/C=AU/' -keyout " + ROOT_DIR + "/plugins/onlyoffice/var/www/onlyoffice/Data/certs/onlyoffice.key -out " + ROOT_DIR + "/plugins/onlyoffice/var/www/onlyoffice/Data/certs/onlyoffice.crt",
        "docker-compose -f " + ROOT_DIR + "/plugins/onlyoffice/docker-compose.yml up -d",
      ];
    }
  },
  disable: {
    pathname: "/onlyoffice-remove",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/onlyoffice/docker-compose.yml down",
      ];
    }
  }
};
