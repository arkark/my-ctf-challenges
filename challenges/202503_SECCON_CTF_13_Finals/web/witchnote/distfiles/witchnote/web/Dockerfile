FROM node:22.14.0

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN chmod 1777 public/notes

USER 404:404
CMD node index.js
