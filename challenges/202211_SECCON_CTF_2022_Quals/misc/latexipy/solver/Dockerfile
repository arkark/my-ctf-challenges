FROM python:3.10.8

RUN apt-get update && apt-get -y install sshpass

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

ADD . .

CMD ["python3", "/app/solver.py"]
