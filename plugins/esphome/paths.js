module.exports = {
  enable: {
    pathname: "/esphome-start",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/esphome/docker-compose.yml up -d",
      ];
    }
  },
  disable: {
    pathname: "/esphome-remove",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/esphome/docker-compose.yml down",
      ];
    }
  }
};
