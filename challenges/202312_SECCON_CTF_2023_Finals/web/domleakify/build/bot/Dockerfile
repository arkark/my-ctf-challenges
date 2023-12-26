FROM mcr.microsoft.com/playwright:v1.40.1-jammy

ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_x86_64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN npm install --omit=dev
COPY . .

USER pwuser

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "index.js"]
