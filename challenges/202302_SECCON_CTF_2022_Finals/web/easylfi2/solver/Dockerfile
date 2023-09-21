FROM python:3.11.1-alpine

RUN apk --no-cache add curl

WORKDIR /app
ADD . .

CMD ["python3", "solver.py"]
