FROM node:25-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "index.js"]
