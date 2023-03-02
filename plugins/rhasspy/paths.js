module.exports = {
  enable: {
    pathname: "/rhasspy-start",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/rhasspy/docker-compose.yml up -d",
      ];
    }
  },
  pull: {
    pathname: "/rhasspy-pull",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/rhasspy/docker-compose.yml pull",
        "docker-compose -f " + ROOT_DIR + "/plugins/rhasspy/docker-compose.yml down",
        "docker-compose -f " + ROOT_DIR + "/plugins/rhasspy/docker-compose.yml up -d",
      ];
    }
  },
  disable: {
    pathname: "/rhasspy-remove",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/rhasspy/docker-compose.yml down",
      ];
    }
  }
};
