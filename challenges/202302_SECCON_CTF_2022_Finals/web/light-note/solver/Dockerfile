FROM node:19.6.0-slim

WORKDIR /app
ENV NODE_TLS_REJECT_UNAUTHORIZED 0

COPY ["package.json", "package-lock.json", "./"]
RUN npm install

COPY . .

CMD ["node", "index.js"]
