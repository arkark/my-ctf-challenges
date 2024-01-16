# [web] eeeeejs

## Description

Can you bypass all mitigations?

- Challenge: `http://eeeeejs.seccon.games:3000`
- Admin bot: `http://eeeeejs.seccon.games:1337`

## Attachments

- [eeeeejs](files/eeeeejs)

## Usage

Launch a challenge server:

```
cd build
docker compose up
```

Run the author's solver:

```
docker run -it \
    -e BOT_BASE_URL=http://localhost:1337 \
    -e ATTACKER_BASE_URL=http://attacker.example.com \
    -p 8080:8080 --network=host \
    (docker build -q ./solver)
```

where `http://attacker.example.com` is an origin forwarded to `http://localhost:8080`.

## Flag

```
SECCON{RCE_is_po55ible_if_mitigation_4_does_not_exist}
```
