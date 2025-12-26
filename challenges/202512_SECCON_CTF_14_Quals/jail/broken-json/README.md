# [jail] broken-json

## Description

Break Time ☕

```
nc broken-json.seccon.games 5000
```

## Attachments

- [broken-json](distfiles)

## Usage

Launch a challenge server:
```sh
cd build
docker compose up
```

Run the author's solver:
```sh
docker run -it \
    -e SECCON_HOST=localhost \
    -e SECCON_PORT=5000 \
    --network=host \
    (docker build -q ./solution)
```
