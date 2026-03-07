FROM node:25.6.0

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

USER 404:404
CMD ["node", "index.js"]
