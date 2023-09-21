FROM node:19.6.0-slim

WORKDIR /app

RUN apt update && apt install -y python3 python3-pip hashcash

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY ["package.json", "package-lock.json", "./"]
RUN npm install

COPY . .

CMD ["python3", "pow.py"]
