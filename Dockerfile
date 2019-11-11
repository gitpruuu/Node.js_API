FROM node:10-alpine

MAINTAINER Johnatan_Souza

WORKDIR /app

COPY ./ /app/

RUN npm install

EXPOSE 3000

CMD ["node", "./bin/server.js"]