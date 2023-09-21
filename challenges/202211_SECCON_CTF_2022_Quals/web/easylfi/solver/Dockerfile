FROM python:3.10.8-alpine

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

ADD . .

CMD ["python3", "solver.py"]
