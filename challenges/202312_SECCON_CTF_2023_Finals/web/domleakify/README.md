# [web] DOMLeakify

## Description

NO LEAK, NO LIFE.

- Challenge: `http://domleakify.{int,dom}.seccon.games:3000`
- Admin bot: `http://domleakify.{int,dom}.seccon.games:1337`

[domleakify](files/domleakify)

## Usage

Launch a challenge server:

```
cd build
docker compose up
```

Run the author's solver:
```
docker run -it \
    -e WEB_BASE_URL=http://localhost:3000 \
    -e BOT_BASE_URL=http://localhost:1337 \
    -e ATTACKER_BASE_URL=http://attacker.example.com \
    -p 8080:8080 --network=host \
    (docker build -q ./solver)
```

where `http://attacker.example.com` is an origin forwarded to `http://localhost:8080`.

## Flag

```
SECCON{attr_cssi}
```
