# [web] MaaS

## Description

Minifier as a Service

- `http://maas.{int,dom}.seccon.games:3000`

## Attachments

- [maas](files/maas)

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
SECCON{csp_bypa55_is_a_type_0f_puzzle_games_for_h4ckerS}
```
