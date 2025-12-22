FROM node:24.10.0@sha256:377f1c17906eb5a145c34000247faa486bece16386b77eedd5a236335025c2ef

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
