module.exports = {
  enable: {
    pathname: "/nextcloud-start",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/nextcloud/docker-compose.yml up -d",
      ];
    }
  },
  disable: {
    pathname: "/nextcloud-remove",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/nextcloud/docker-compose.yml down",
      ];
    }
  },
};
