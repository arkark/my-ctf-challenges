# [web] fetch-box

## Description

A client-side sandbox challenge!

- Challenge: `http://fetch-box.asisctf.com:3000`
- Admin bot: `http://fetch-box.asisctf.com:1337`

## Attachments

- [fetch-box](distfiles)

## Usage

Launch a challenge server:

```
cd challenge
docker compose up
```

Run the author's solver:
```
docker run -it --rm \
    -e BOT_BASE_URL=http://localhost:1337 \
    -e WEB_BASE_URL=http://localhost:1337 \
    -e CONNECTBACK_URL=http://attacker.example.com \
    -p 8080:8080 --network=host \
    (docker build -q ./solution)
```
where `http://attacker.example.com` is an origin forwarded to `http://localhost:8080`.
