FROM golang:1.23.3-bookworm AS base
WORKDIR /app

COPY flag.txt .
RUN mv flag.txt /flag-$(md5sum flag.txt | cut -c-32).txt
COPY --chmod=555 app.py run

FROM pwn.red/jail
COPY --from=base / /srv
ENV JAIL_TIME=30 JAIL_MEM=500M JAIL_CPU=4000 JAIL_PIDS=100 JAIL_TMP_SIZE=50M JAIL_CONNS_PER_IP=4 JAIL_POW=5000
