FROM node:17.0.1-slim

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

CMD ["node", "index.js"]
