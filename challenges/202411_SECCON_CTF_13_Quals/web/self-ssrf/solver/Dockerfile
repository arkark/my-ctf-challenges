FROM ubuntu:latest

RUN apt-get update && apt-get install -yq curl

WORKDIR /app
ENV LANG C.UTF-8

COPY . .
CMD ["./exploit.sh"]
