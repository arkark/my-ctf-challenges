# [sandbox] deno-ppjail

## Description

Do you like Deno better than Node?

```
nc deno-ppjail.seccon.games 1337
```

## Attachments

- [deno-ppjail](files/deno-ppjail)

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
