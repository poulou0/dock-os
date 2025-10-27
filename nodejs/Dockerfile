FROM node:current-alpine

RUN apk add --update --no-cache openssh sshpass apache2-utils curl

ENTRYPOINT ["docker-entrypoint.sh"]

CMD [ "node" ]
