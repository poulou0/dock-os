FROM node:buster-slim

RUN apt update \
  && apt -y --no-install-recommends install ssh sshpass

ENTRYPOINT ["docker-entrypoint.sh"]

CMD [ "node" ]
