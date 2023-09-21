FROM node:19.6.0-slim

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN npm install
COPY . .

CMD ["node", "index.js"]
