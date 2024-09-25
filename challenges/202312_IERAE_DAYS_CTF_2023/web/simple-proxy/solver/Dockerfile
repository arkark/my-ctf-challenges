FROM python:3.12-slim
WORKDIR /app
RUN apt-get update && apt-get install -y curl
ADD . .
CMD ["python", "exploit.py"]
