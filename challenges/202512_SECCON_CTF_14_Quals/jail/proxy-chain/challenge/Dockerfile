FROM node:24.11.1-slim AS base
WORKDIR /app

COPY flag.txt .
RUN mv flag.txt /flag-$(md5sum flag.txt | cut -c-32).txt
COPY jail.js .
COPY --chmod=555 index.js run

FROM pwn.red/jail
COPY --from=base / /srv
ENV JAIL_TIME=30 JAIL_MEM=50M JAIL_CPU=100 JAIL_PIDS=100
