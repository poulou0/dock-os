module.exports = {
  enable: {
    pathname: "/pihole-start",
    commands: ({ROOT_DIR}) => {
      return [
        "docker pull pihole/pihole:latest",
        "systemctl disable systemd-resolved",
        "systemctl stop systemd-resolved",
        "docker-compose -f " + ROOT_DIR + "/plugins/pihole/docker-compose.yml up -d",
      ];
    }
  },
  disable: {
    pathname: "/pihole-remove",
    commands: ({ROOT_DIR}) => {
      return [
        "docker-compose -f " + ROOT_DIR + "/plugins/pihole/docker-compose.yml down",
        "systemctl enable systemd-resolved",
        "systemctl start systemd-resolved",
      ];
    }
  }
};
