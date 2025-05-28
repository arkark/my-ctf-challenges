FROM python:3.13.3-slim-bookworm

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
RUN mv flag.txt /flag-$(md5sum flag.txt | cut -c-32).txt

CMD ["python", "app.py"]
