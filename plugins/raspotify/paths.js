module.exports = {
  enable: {
    pathname: "/raspotify-start",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/raspotify/docker-compose.yml up -d",
      ];
    }
  },
  pull: {
    pathname: "/raspotify-pull",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/raspotify/docker-compose.yml pull",
        "docker-compose -f " + ROOT_DIR + "/plugins/raspotify/docker-compose.yml down",
        "docker-compose -f " + ROOT_DIR + "/plugins/raspotify/docker-compose.yml up -d",
      ];
    }
  },
  disable: {
    pathname: "/raspotify-remove",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/raspotify/docker-compose.yml down",
      ];
    }
  },
};
