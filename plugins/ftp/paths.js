module.exports = {
  enable: {
    pathname: "/ftp-start",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/ftp/docker-compose.yml up -d",
      ];
    }
  },
  pull: {
    pathname: "/ftp-pull",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/ftp/docker-compose.yml pull",
        "docker-compose -f " + ROOT_DIR + "/plugins/ftp/docker-compose.yml down",
        "docker-compose -f " + ROOT_DIR + "/plugins/ftp/docker-compose.yml up -d",
      ];
    }
  },
  disable: {
    pathname: "/ftp-remove",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/ftp/docker-compose.yml down",
      ];
    }
  },
};
