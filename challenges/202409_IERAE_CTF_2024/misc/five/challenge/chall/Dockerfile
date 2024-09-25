FROM oven/bun:1.1.27@sha256:0bce8e8f0eb41e131df5529fcce89dc8b97135f4a583fa7f28d48cbcdb26ff4e

RUN apt-get update && apt-get install -yq python3 python3-pip

WORKDIR /app

COPY flag.txt .
RUN mv flag.txt /

COPY requirements.txt .
RUN pip3 install -r requirements.txt
COPY app.py app.py

COPY sandbox sandbox
RUN chmod 1777 sandbox

USER 404:404
CMD flask run --host 0.0.0.0 --port 3000
