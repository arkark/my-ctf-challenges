# [web] skipinx

## Description

ALL YOU HAVE TO DO IS SKIP NGINX

- `http://skipinx.seccon.games:8080`

## Attachments

- [skipinx](files/skipinx)

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
    -e SECCON_PORT=8080 \
    --network=host \
    (docker build -q ./solver)
```
