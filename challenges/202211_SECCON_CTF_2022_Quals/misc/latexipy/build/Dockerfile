FROM python:3.10.8

RUN apt-get update && apt-get -y install socat

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY flag.txt /
RUN chmod 444 /flag.txt

COPY app.py .
RUN chmod 444 app.py

USER 404:404

CMD socat -T 30 TCP-L:2337,fork,reuseaddr EXEC:"python3 app.py"
