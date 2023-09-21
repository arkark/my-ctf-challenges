# [web] x-note

## Description

Here is a secure note app!

- `http://x-note-x.quals.seccon.jp:3000`

[dist](files/dist)

Flag format: `SECCON{[_0-9a-z]+}`

## Usage

Launch a challenge server:

```
docker compose up
```

Run the author's solver:

```
docker run -it \
    -e SECCON_URL=http://localhost:3000 \
    -e ATTACK_URL=http://attacker.example.com \
    -p 8080:8080 --network=host \
    (docker build -q ./solver)
```

where `http://attacker.example.com` is an origin forwarded to `http://localhost:8080`.

## Flag

```
SECCON{m4rqu3e_1s_my_l1fe_b}
```
