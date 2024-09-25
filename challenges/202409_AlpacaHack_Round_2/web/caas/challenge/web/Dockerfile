FROM node:22.7.0-slim

RUN apt update && apt -y install cowsay

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN mv flag.txt /flag-$(md5sum flag.txt | cut -c-32).txt
RUN chmod 1777 public/out

USER 404:404
CMD node index.js
