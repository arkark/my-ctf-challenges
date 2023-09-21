FROM node:18.10.0-slim

ENV NODE_ENV=production

RUN apt-get update && apt-get install -yq wget socat procps

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

# https://github.com/josephg/noisejs
RUN wget https://raw.githubusercontent.com/josephg/noisejs/master/perlin.js

RUN npm install --omit=dev

COPY index.js .

CMD socat -T 30 TCP-L:1337,fork,reuseaddr EXEC:"node index.js"
