FROM python:3.13.3-slim-bookworm

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

USER 404:404
CMD ["gunicorn", "--workers", "8", "--bind", "0.0.0.0:3000", "app:app"]
