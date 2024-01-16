# [web] light-note

## Description

I created a blazing fast note application!

- `https://light-note.{int,dom}.seccon.games`

## Attachments

- [light-note](files/light-note)

## Usage

Launch a challenge server:

```
cd files/light-note
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
SECCON{induction_i5_one_0f_my_favarite_g4mes}
```
