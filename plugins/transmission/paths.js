module.exports = {
  enable: {
    pathname: "/transmission-start",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/transmission/docker-compose.yml up -d",
      ];
    }
  },
  pull: {
    pathname: "/transmission-pull",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/transmission/docker-compose.yml pull",
        "docker-compose -f " + ROOT_DIR + "/plugins/transmission/docker-compose.yml down",
        "docker-compose -f " + ROOT_DIR + "/plugins/transmission/docker-compose.yml up -d",
      ];
    }
  },
  disable: {
    pathname: "/transmission-remove",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/transmission/docker-compose.yml down",
      ];
    }
  }
};
