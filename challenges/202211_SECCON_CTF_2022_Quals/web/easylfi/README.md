# [web] easylfi

## Description

Can you read my secret?

- `http://easylfi.seccon.games:3000`

[easylfi](files/easylfi)

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
SECCON{i_lik3_fe4ture_of_copy_aS_cur1_in_br0wser}
```
