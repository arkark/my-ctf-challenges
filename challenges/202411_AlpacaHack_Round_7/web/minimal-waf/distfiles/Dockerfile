FROM node:22.11.0

RUN apt-get update && apt-get install -y chromium
RUN rm -rf /var/lib/apt/lists/*

RUN groupadd -r pptruser \
    && useradd -r -g pptruser -G audio,video pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser

WORKDIR /app/bot
COPY bot/package.json bot/package-lock.json ./
ENV PUPPETEER_SKIP_DOWNLOAD=true
RUN npm install --omit=dev
COPY bot .

WORKDIR /app/web
COPY web/package.json web/package-lock.json ./
RUN npm install
COPY web .

WORKDIR /app
USER pptruser

CMD ["bash", "-c", "node /app/web/index.js & node /app/bot/index.js"]
