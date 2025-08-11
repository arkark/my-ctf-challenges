FROM node:24.1.0@sha256:c332080545f1de96deb1c407e6fbe9a7bc2be3645e127845fdcce57a7af3cf56

RUN apt-get update && apt-get install -y chromium
RUN rm -rf /var/lib/apt/lists/*

RUN groupadd -r pptruser \
    && useradd -r -g pptruser -G audio,video pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser

WORKDIR /app
COPY package.json package-lock.json ./
ENV PUPPETEER_SKIP_DOWNLOAD=true
RUN npm install --omit=dev
COPY . .

USER pptruser

CMD ["node", "index.js"]
