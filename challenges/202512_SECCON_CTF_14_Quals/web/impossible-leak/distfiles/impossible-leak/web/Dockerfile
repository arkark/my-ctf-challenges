FROM node:25.2.1

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

USER 404:404
CMD ["node", "index.js"]
