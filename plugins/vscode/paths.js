module.exports = {
  enable: {
    pathname: "/vscode-start",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/vscode/docker-compose.yml up -d",
      ];
    }
  },
  pull: {
    pathname: "/vscode-pull",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/vscode/docker-compose.yml pull",
        "docker-compose -f " + ROOT_DIR + "/plugins/vscode/docker-compose.yml down",
        "docker-compose -f " + ROOT_DIR + "/plugins/vscode/docker-compose.yml up -d",
      ];
    }
  },
  disable: {
    pathname: "/vscode-remove",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/vscode/docker-compose.yml down",
      ];
    }
  },
};
