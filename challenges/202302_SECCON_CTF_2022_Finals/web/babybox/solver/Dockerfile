FROM python:3.11.1-alpine

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

ADD . .

CMD ["python3", "solver.py"]
