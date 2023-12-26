FROM node:21-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY flag.txt .
RUN mv flag.txt /flag-$(md5sum flag.txt | cut -c-32).txt

COPY . .

USER 404:404

CMD ["node", "index.js"]
