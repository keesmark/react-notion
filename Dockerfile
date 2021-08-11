FROM node:14.17.1-alpine

WORKDIR /app

COPY . .

RUN apk update
RUN npm install -g npm

EXPOSE 3000
