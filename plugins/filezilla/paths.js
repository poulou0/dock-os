module.exports = {
  enable: {
    pathname: "/filezilla-start",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/filezilla/docker-compose.yml up -d",
      ];
    }
  },
  pull: {
    pathname: "/filezilla-pull",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/filezilla/docker-compose.yml pull",
        "docker-compose -f " + ROOT_DIR + "/plugins/filezilla/docker-compose.yml down",
        "docker-compose -f " + ROOT_DIR + "/plugins/filezilla/docker-compose.yml up -d",
      ];
    }
  },
  disable: {
    pathname: "/filezilla-remove",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/filezilla/docker-compose.yml down",
      ];
    }
  },
};
