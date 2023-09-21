FROM node:19.6.0-slim
ENV NODE_ENV=production
WORKDIR /app

RUN apt update && apt install -y curl

COPY ["package.json", "package-lock.json", "./"]
RUN npm install --omit=dev
COPY . .
RUN mv flag.txt /flag.txt

USER 404:404

CMD ["node", "index.js"]
