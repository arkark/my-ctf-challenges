FROM node:22.9.0

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

USER 404:404
CMD node index.js
