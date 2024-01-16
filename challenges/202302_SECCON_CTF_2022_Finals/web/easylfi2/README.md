# [web] easylfi2

## Description

[easylfi](https://github.com/SECCON/SECCON2022_online_CTF/tree/main/web/easylfi) again! I know you fully understand everything about curl.

- `http://easylfi2.{int,dom}.seccon.games:3000`

## Attachments

- [easylfi2](files/easylfi2)

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

## Flag

```
SECCON{Wha7_files_did_you_use_to_s0lve_1t}
```
