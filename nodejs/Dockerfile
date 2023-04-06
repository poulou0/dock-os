FROM node:current-alpine

RUN apk add --update --no-cache openssh sshpass

ENTRYPOINT ["docker-entrypoint.sh"]

CMD [ "node" ]
