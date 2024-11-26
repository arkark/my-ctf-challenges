# [web] Trillion Bank

## Description

Can you get over **$1,000,000,000,000**?

- Challenge: `http://trillion.seccon.games:3000`

## Attachments

- [trillion](files)

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
