# [web] Warpup

## Description

warpup = warp + warmup

- Challenge: `http://warpup.{int,dom}.seccon.games:3000`

## Attachments

- [warpup](distfiles)

## Usage

Launch a challenge server:

```
cd challenge
docker compose up
```

Run the author's solver:

```
docker run -it \
    -e SECCON_HOST=localhost \
    -e SECCON_PORT=3000 \
    --network=host \
    (docker build -q ./solution)
```
