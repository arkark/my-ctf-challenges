FROM php:8.3.24-cli-alpine

RUN apk add --no-cache caddy
WORKDIR /srv/app

COPY entrypoint.sh /srv/entrypoint.sh
RUN chmod +x /srv/entrypoint.sh

COPY index.php /srv/app
USER 404:404

EXPOSE 3000
ENTRYPOINT ["/srv/entrypoint.sh"]
