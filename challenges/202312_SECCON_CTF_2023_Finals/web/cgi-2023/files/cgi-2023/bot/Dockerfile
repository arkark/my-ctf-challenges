FROM node:21-slim

RUN apt-get update
RUN apt-get install -y wget gnupg ca-certificates procps libxss1 \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update
RUN apt-get install -y google-chrome-stable
RUN rm -rf /var/lib/apt/lists/*

ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_x86_64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

RUN groupadd -r pptruser \
    && useradd -r -g pptruser -G audio,video pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser

WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
ENV PUPPETEER_SKIP_DOWNLOAD=true
RUN npm install --omit=dev
COPY . .

USER pptruser

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "index.js"]
