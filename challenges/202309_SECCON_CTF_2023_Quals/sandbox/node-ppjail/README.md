# [sandbox] node-ppjail

## Description

Do you like Node better than Deno?

```
nc node-ppjail.seccon.games 1337
```

## Attachments

- [node-ppjail](files/node-ppjail)

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
