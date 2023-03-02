module.exports = {
  enable: {
    pathname: "/portainer-start",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/portainer/docker-compose.yml up -d",
      ];
    }
  },
  pull: {
    pathname: "/portainer-pull",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/portainer/docker-compose.yml pull",
        "docker-compose -f " + ROOT_DIR + "/plugins/portainer/docker-compose.yml down",
        "docker-compose -f " + ROOT_DIR + "/plugins/portainer/docker-compose.yml up -d",
      ];
    }
  },
  disable: {
    pathname: "/portainer-remove",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/portainer/docker-compose.yml down",
      ];
    }
  }
};
