module.exports = {
  enable: {
    pathname: "/wgeasy-start",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/wgeasy/docker-compose.yml up -d",
      ];
    }
  },
  pull: {
    pathname: "/wgeasy-pull",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/wgeasy/docker-compose.yml pull",
        "docker-compose -f " + ROOT_DIR + "/plugins/wgeasy/docker-compose.yml down",
        "docker-compose -f " + ROOT_DIR + "/plugins/wgeasy/docker-compose.yml up -d",
      ];
    }
  },
  disable: {
    pathname: "/wgeasy-remove",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/wgeasy/docker-compose.yml down",
      ];
    }
  },
};
