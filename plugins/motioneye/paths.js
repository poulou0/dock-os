module.exports = {
  enable: {
    pathname: "/motioneye-start",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/motioneye/docker-compose.yml up -d",
      ];
    }
  },
  disable: {
    pathname: "/motioneye-remove",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/motioneye/docker-compose.yml down",
      ];
    }
  }
};
