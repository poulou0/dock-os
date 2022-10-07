module.exports = {
  enable: {
    pathname: "/retroarchweb-start",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/retroarchweb/docker-compose.yml up -d",
      ];
    }
  },
  disable: {
    pathname: "/retroarchweb-remove",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/retroarchweb/docker-compose.yml down",
      ];
    }
  }
};
