FROM python:3.11-bookworm

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY templates templates
COPY app.py app.py

USER 404:404
CMD ["gunicorn", "--workers", "4", "--bind", "0.0.0.0:3000", "app:app"]
