module.exports = {
  enable: {
    pathname: "/phpmyadmin-start",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/phpmyadmin/docker-compose.yml up -d",
      ];
    }
  },
  disable: {
    pathname: "/phpmyadmin-remove",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/phpmyadmin/docker-compose.yml down",
      ];
    }
  },
};
