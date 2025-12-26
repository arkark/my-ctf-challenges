FROM python:3.14.0 AS base
WORKDIR /app

COPY flag.txt .
RUN mv flag.txt /flag-$(md5sum flag.txt | cut -c-32).txt
COPY jail.py run


FROM pwn.red/jail
COPY --from=base / /srv
RUN chmod 555 /srv/app/run
ENV JAIL_TIME=30 JAIL_MEM=50M JAIL_CPU=100 JAIL_CONNS_PER_IP=2
