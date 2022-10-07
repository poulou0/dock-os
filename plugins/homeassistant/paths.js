module.exports = {
  enable: {
    pathname: "/homeassistant-start",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/homeassistant/docker-compose.yml up -d",
      ];
    }
  },
  disable: {
    pathname: "/homeassistant-remove",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/homeassistant/docker-compose.yml down",
      ];
    }
  }
};
