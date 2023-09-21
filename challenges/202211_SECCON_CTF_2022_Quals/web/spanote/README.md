# [web] spanote

## Description

Single Page Application makes our note app simple.

- `http://spanote.seccon.games:3000`

[spanote](files/spanote)

## Usage

Launch a challenge server:

```
cd build
docker compose up
```

Run the author's solver:

```
docker run -it \
    -e SECCON_BASE_URL=http://localhost:3000 \
    -e ATTACK_BASE_URL=http://attacker.example.com \
    -p 8080:8080 --network=host \
    (docker build -q ./solver)
```

where `http://attacker.example.com` is an origin forwarded to `http://localhost:8080`.

## Flag

```
SECCON{hack3rs_po11ute_3verything_by_v4ri0us_meanS}
```
