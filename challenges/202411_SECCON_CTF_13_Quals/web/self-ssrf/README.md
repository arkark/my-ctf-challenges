# [web] self-ssrf

## Description

Guess the flag, or abuse the `/ssrf` endpoint.

- Challenge: `http://self-ssrf.seccon.games:3000`

## Attachments

- [self-ssrf](files)

## Usage

Launch a challenge server:

```
cd build
docker compose up
```

Run the author's solver:
```
docker run -it \
    -e SECCON_HOST=localhost \
    --network=host \
    (docker build -q ./solver)
```
