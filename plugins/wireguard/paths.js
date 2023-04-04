module.exports = {
  enable: {
    pathname: "/wireguard-start",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/wireguard/docker-compose.yml up -d",
      ];
    }
  },
  pull: {
    pathname: "/wireguard-pull",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/wireguard/docker-compose.yml pull",
        "docker-compose -f " + ROOT_DIR + "/plugins/wireguard/docker-compose.yml down",
        "docker-compose -f " + ROOT_DIR + "/plugins/wireguard/docker-compose.yml up -d",
      ];
    }
  },
  disable: {
    pathname: "/wireguard-remove",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/wireguard/docker-compose.yml down",
      ];
    }
  },
};
