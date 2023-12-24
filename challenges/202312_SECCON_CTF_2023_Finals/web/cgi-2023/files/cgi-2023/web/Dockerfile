FROM golang:1.21.5 AS build-stage

WORKDIR /app

COPY go.mod .
COPY *.go .

RUN CGO_ENABLED=0 GOOS=linux go build


FROM httpd:2.4.58-bookworm

COPY ctf.conf /usr/local/apache2/conf.d/ctf.conf
RUN echo "Include /usr/local/apache2/conf.d/ctf.conf" >> /usr/local/apache2/conf/httpd.conf

COPY --from=build-stage /app/app /usr/local/apache2/cgi-bin/index.cgi
