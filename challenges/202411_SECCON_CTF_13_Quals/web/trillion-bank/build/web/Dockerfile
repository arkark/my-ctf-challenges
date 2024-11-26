FROM node:22.9.0

WORKDIR /app

RUN apt-get update && \
    apt-get install -y default-mysql-client && \
    rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm install

COPY . .

USER 404:404
CMD node index.js
