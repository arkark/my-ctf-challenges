FROM node:24.1.0@sha256:c332080545f1de96deb1c407e6fbe9a7bc2be3645e127845fdcce57a7af3cf56

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

USER 404:404
CMD ["node", "index.js"]
