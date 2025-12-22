FROM node:24.10.0@sha256:377f1c17906eb5a145c34000247faa486bece16386b77eedd5a236335025c2ef

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

USER 404:404
CMD ["node", "index.js"]
