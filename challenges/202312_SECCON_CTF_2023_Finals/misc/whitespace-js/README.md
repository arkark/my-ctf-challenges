# [misc] whitespace.js

## Description

Don't worry, this is not an esolang challenge.

- Challenge: `https://whitespace-js.{int,dom}.seccon.games:3000`

[whitespace-js](files/whitespace-js)

## Usage

Launch a challenge server:

```
cd build
docker compose up
```

Run the author's solver:

```
docker run -it --rm \
    -e WEB_BASE_URL=http://localhost:3000 \
    --network=host \
    (docker build -q ./solver)
```

## Flag

```
SECCON{P4querett3_Down_the_Bunburr0ws}
```
