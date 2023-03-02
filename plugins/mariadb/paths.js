module.exports = {
  enable: {
    pathname: "/mariadb-start",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/mariadb/docker-compose.yml up -d",
      ];
    }
  },
  pull: {
    pathname: "/mariadb-pull",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/mariadb/docker-compose.yml pull",
        "docker-compose -f " + ROOT_DIR + "/plugins/mariadb/docker-compose.yml down",
        "docker-compose -f " + ROOT_DIR + "/plugins/mariadb/docker-compose.yml up -d",
      ];
    }
  },
  disable: {
    pathname: "/mariadb-remove",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/mariadb/docker-compose.yml down",
      ];
    }
  },
};
