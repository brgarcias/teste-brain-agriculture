FROM node:19-alpine

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i

RUN apk --no-cache add curl
RUN curl -L https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-alpine-linux-amd64 -o /usr/local/bin/dockerize \
    && chmod +x /usr/local/bin/dockerize

COPY . .

EXPOSE 3001

CMD ["./docker-entrypoint.sh"]