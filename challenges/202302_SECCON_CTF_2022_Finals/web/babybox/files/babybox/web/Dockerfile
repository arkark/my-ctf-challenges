FROM node:19.6.0-slim
ENV NODE_ENV=production
WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN npm install --omit=dev
COPY . .
RUN mv flag.txt /flag-$(md5sum flag.txt | cut -c-32).txt

USER 404:404

CMD ["node", "index.js"]
