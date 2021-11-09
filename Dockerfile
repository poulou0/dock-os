FROM node:buster-slim

RUN apt update \
  && apt -y --no-install-recommends install ca-certificates curl gnupg lsb-release \
  && curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg \
  && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
       $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null \
  && apt update \
  && apt -y --no-install-recommends install docker-ce

ENTRYPOINT ["docker-entrypoint.sh"]

CMD [ "node" ]
