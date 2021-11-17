module.exports = {
  enable: {
    pathname: "/filebrowser-start",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/filebrowser/docker-compose.yml up -d",
      ];
    }
  },
  disable: {
    pathname: "/filebrowser-remove",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/filebrowser/docker-compose.yml down",
      ];
    }
  },
};
