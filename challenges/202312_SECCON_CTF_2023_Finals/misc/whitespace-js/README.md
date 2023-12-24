# [misc] whitespace.js

## Description

Don't worry, this is not an esolang challenge.

- Challenge: `https://whitespace-js.{int,dom}.seccon.games:3000`

[whitespace-js](files/whitespace-js)

## Usage

Launch a challenge server:

```
cd files/whitespace-js
docker compose up
```

Run the author's solver:

```
docker run -it --rm \
    -e WEB_BASE_URL=http://localhost:3000 \
    --network=host \
    (docker build -q ./solver)
```