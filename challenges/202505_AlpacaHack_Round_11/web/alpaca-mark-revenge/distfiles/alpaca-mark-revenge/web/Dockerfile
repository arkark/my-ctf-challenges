FROM node:24.0.1-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

USER 404:404
CMD npm run preview
