# [misc] noiseccon

## Description

Noise! Noise! Noise!

```
nc noiseccon.seccon.games 1337
```

## Attachments

- [noiseccon](files/noiseccon)

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
    -e SECCON_PORT=1337 \
    --network=host \
    (docker build -q ./solver)
```
