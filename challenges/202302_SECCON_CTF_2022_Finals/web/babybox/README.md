# [web] babybox

## Description

Can you hack this sandbox?

- `http://babybox.{int,dom}.seccon.games:3000`

## Attachments

- [babybox](files/babybox)

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
SECCON{pr0totyp3_po11ution_iS_my_friend}
```
