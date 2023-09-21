FROM node:19.6.0-slim
ENV NODE_ENV=production
WORKDIR /app

RUN apt update && apt install -y hashcash iproute2 socat procps

COPY ["package.json", "package-lock.json", "./"]
RUN npm install --omit=dev
COPY . .

USER 404:404

CMD ["node", "index.js"]
