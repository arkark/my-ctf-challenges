# [web] easylfi

## Description

Can you read my secret?

- `http://easylfi.seccon.games:3000`

## Attachments

- [easylfi](files/easylfi)

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
    -e SECCON_PORT=3000 \
    --network=host \
    (docker build -q ./solver)
```
