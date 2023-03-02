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
  pull: {
    pathname: "/onlyoffice-pull",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/onlyoffice/docker-compose.yml pull",
        "docker-compose -f " + ROOT_DIR + "/plugins/onlyoffice/docker-compose.yml down",
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
  },
  generate_allfonts: {
    pathname: "/onlyoffice-generate-allfonts",
    commands: ({ROOT_DIR}) => {
      return [
        // "echo 'THIS WILL TAKE SOME TIME!! Clear all data/cookies from onlyoffice when it's done!'",
        "docker-compose -f " + ROOT_DIR + "/plugins/onlyoffice/docker-compose.yml exec -T onlyoffice /usr/bin/documentserver-generate-allfonts.sh",
        // "docker exec -it onlyoffice /usr/bin/documentserver-generate-allfonts.sh",
      ];
    }
  }
};
