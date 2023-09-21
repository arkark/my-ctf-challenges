FROM python:3.10.7

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

ADD . .

CMD ["python3", "/app/solver.py"]
