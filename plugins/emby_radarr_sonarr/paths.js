module.exports = {
  enable: {
    pathname: "/emby-start",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/emby_radarr_sonarr/docker-compose.yml up -d",
      ];
    }
  },
  pull: {
    pathname: "/emby-pull",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/emby_radarr_sonarr/docker-compose.yml pull",
        "docker-compose -f " + ROOT_DIR + "/plugins/emby_radarr_sonarr/docker-compose.yml down",
        "docker-compose -f " + ROOT_DIR + "/plugins/emby_radarr_sonarr/docker-compose.yml up -d",
      ];
    }
  },
  disable: {
    pathname: "/emby-remove",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/emby_radarr_sonarr/docker-compose.yml down",
      ];
    }
  }
};
