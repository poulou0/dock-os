module.exports = {
  enable: {
    pathname: "/shellinabox-start",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/shellinabox/docker-compose.yml up -d",
      ];
    }
  },
  disable: {
    pathname: "/shellinabox-remove",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/shellinabox/docker-compose.yml down",
      ];
    }
  }
};
