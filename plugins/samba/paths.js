module.exports = {
  enable: {
    pathname: "/samba-start",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/samba/docker-compose.yml up -d",
      ];
    }
  },
  disable: {
    pathname: "/samba-remove",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/samba/docker-compose.yml down",
      ];
    }
  },
};
