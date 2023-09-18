# [sandbox] crabox

## Description

🦀 Compile-Time Sandbox Escape 🦀

```
nc crabox.seccon.games 1337
```

## Attachments

- [crabox](files/crabox)

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

## Flag

```
SECCON{ctfe_i5_p0w3rful}
```
