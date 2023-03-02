module.exports = {
  enable: {
    pathname: "/duplicati-start",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/duplicati/docker-compose.yml up -d",
      ];
    }
  },
  pull: {
    pathname: "/duplicati-pull",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/duplicati/docker-compose.yml pull",
        "docker-compose -f " + ROOT_DIR + "/plugins/duplicati/docker-compose.yml down",
        "docker-compose -f " + ROOT_DIR + "/plugins/duplicati/docker-compose.yml up -d",
      ];
    }
  },
  disable: {
    pathname: "/duplicati-remove",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/duplicati/docker-compose.yml down",
      ];
    }
  }
};
