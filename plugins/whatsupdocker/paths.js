module.exports = {
  enable: {
    pathname: "/whatsupdocker-start",
    commands: ({ROOT_DIR}) => {
      return [
        "WUD_USER=$(grep -E '^USER=' /app/.env | cut -d '=' -f2-) WUD_HASH=$(htpasswd -nib admin $(grep -E '^PASSWORD=' /app/.env | cut -d '=' -f2-) | cut -c7- | tr -d '[:space:]' | sed 's/\\$/\\\\$/g') docker-compose -f " + ROOT_DIR + "/plugins/whatsupdocker/docker-compose.yml up -d",
        // DOULEUEI "WUD_USER=$(grep -E '^USER=' /app/.env | cut -d '=' -f2-) WUD_HASH=$(grep -E '^PASSWORD_HASH=' /app/.env | cut -d '=' -f2- | sed 's/\\$/\\\\$/g') docker-compose -f " + ROOT_DIR + "/plugins/whatsupdocker/docker-compose.yml up -d",
      ];
    }
  },
  pull: {
    pathname: "/whatsupdocker-pull",
    commands: ({ROOT_DIR}) => {
      return [
        "WUD_USER=a WUD_HASH=b docker-compose -f " + ROOT_DIR + "/plugins/whatsupdocker/docker-compose.yml pull",
        "WUD_USER=a WUD_HASH=b docker-compose -f " + ROOT_DIR + "/plugins/whatsupdocker/docker-compose.yml down",
        "WUD_USER=$(grep -E '^USER=' /app/.env | cut -d '=' -f2-) WUD_HASH=$(htpasswd -nib admin $(grep -E '^PASSWORD=' /app/.env | cut -d '=' -f2-) | cut -c7- | tr -d '[:space:]' | sed 's/\\$/\\\\$/g') docker-compose -f " + ROOT_DIR + "/plugins/whatsupdocker/docker-compose.yml up -d",
      ];
    }
  },
  disable: {
    pathname: "/whatsupdocker-remove",
    commands: ({ROOT_DIR}) => {
      return [
        "WUD_USER=a WUD_HASH=b docker-compose -f " + ROOT_DIR + "/plugins/whatsupdocker/docker-compose.yml down",
      ];
    }
  },
};
