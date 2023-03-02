module.exports = {
  enable: {
    pathname: "/pihole-start",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/pihole/docker-compose.yml up -d",
      ];
    }
  },
  pull: {
    pathname: "/pihole-pull",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/pihole/docker-compose.yml pull",
        "docker-compose -f " + ROOT_DIR + "/plugins/pihole/docker-compose.yml down",
        "docker-compose -f " + ROOT_DIR + "/plugins/pihole/docker-compose.yml up -d",
      ];
    }
  },
  disable: {
    pathname: "/pihole-remove",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/pihole/docker-compose.yml down",
      ];
    }
  }
};
