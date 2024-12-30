FROM mcr.microsoft.com/playwright:v1.49.1-noble

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --omit=dev
COPY . .

USER pwuser

CMD node index.js
