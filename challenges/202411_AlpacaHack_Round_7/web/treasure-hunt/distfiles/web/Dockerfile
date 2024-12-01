FROM node:22.11.0

WORKDIR /app

COPY public public

# Create flag.txt
RUN echo 'Alpaca{REDACTED}' > ./flag.txt

# Move flag.txt to $FLAG_PATH
RUN FLAG_PATH=./public/$(md5sum flag.txt | cut -c-32 | fold -w1 | paste -sd /)/f/l/a/g/./t/x/t \
    && mkdir -p $(dirname $FLAG_PATH) \
    && mv flag.txt $FLAG_PATH

COPY package.json package-lock.json ./
RUN npm install

COPY index.js .

USER 404:404
CMD node index.js
