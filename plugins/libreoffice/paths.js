module.exports = {
  enable: {
    pathname: "/libreoffice-start",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/libreoffice/docker-compose.yml up -d",
      ];
    }
  },
  disable: {
    pathname: "/libreoffice-remove",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/libreoffice/docker-compose.yml down",
      ];
    }
  },
};
