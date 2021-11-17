module.exports = {
  enable: {
    pathname: "/firefox-start",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/firefox/docker-compose.yml up -d",
      ];
    }
  },
  disable: {
    pathname: "/firefox-remove",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/firefox/docker-compose.yml down",
      ];
    }
  },
};
