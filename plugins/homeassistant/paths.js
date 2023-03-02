module.exports = {
  enable: {
    pathname: "/homeassistant-start",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/homeassistant/docker-compose.yml up -d",
      ];
    }
  },
  pull: {
    pathname: "/homeassistant-pull",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/homeassistant/docker-compose.yml pull",
        "docker-compose -f " + ROOT_DIR + "/plugins/homeassistant/docker-compose.yml down",
        "docker-compose -f " + ROOT_DIR + "/plugins/homeassistant/docker-compose.yml up -d",
      ];
    }
  },
  disable: {
    pathname: "/homeassistant-remove",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/homeassistant/docker-compose.yml down",
      ];
    }
  },
  install_hacs: {
    pathname: "/homeassistant-install-hacs",
    commands: ({ROOT_DIR}) => {
      return [
        "rm -rf " + ROOT_DIR + "/plugins/homeassistant/config/custom_components",
        "mkdir " + ROOT_DIR + "/plugins/homeassistant/config/custom_components",
        "mkdir " + ROOT_DIR + "/plugins/homeassistant/config/custom_components/hacs",
        "wget -O " + ROOT_DIR + "/plugins/homeassistant/config/custom_components/install.zip https://github.com/hacs/integration/releases/latest/download/hacs.zip",
        "unzip " + ROOT_DIR + "/plugins/homeassistant/config/custom_components/install.zip -d " + ROOT_DIR + "/plugins/homeassistant/config/custom_components/hacs",
        "rm " + ROOT_DIR + "/plugins/homeassistant/config/custom_components/install.zip",
        "docker-compose -f " + ROOT_DIR + "/plugins/homeassistant/docker-compose.yml down",
        "docker-compose -f " + ROOT_DIR + "/plugins/homeassistant/docker-compose.yml up -d",
      ];
    }
  },
};
