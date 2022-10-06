module.exports = {
  enable: {
    pathname: "/minidlna-start",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/minidlna/docker-compose.yml up -d",
      ];
    }
  },
  disable: {
    pathname: "/minidlna-remove",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/minidlna/docker-compose.yml down",
      ];
    }
  },
  rescan: {
    pathname: "/minidlna-rescan",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/minidlna/docker-compose.yml exec minidlna /bin/bash -c 'minidlnad -r'",
      ];
    }
  }
};
