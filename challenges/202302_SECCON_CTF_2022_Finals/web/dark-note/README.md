# [web] dark-note

## Description

I created an incredibly blazing-fast note application!

Instancer:
```
nc dark-note.{int,dom}.seccon.games 1337
```

Note: The instancer has no bugs or vulnerabilities (at least in my intended solution).

## Attachments

- [dark-note](files/dark-note)

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
    -e ATTACK_BASE_URL=http://attacker.example.com \
    -p 8080:8080 --network=host \
    (docker build -q ./solver)
```

where `http://attacker.example.com` is an origin forwarded to `http://localhost:8080`.

## Flag

```
SECCON{d0wnwe11}
```
