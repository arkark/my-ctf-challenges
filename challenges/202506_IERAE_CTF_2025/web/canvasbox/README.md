# [web] canvasbox

## Description

The flag is hidden in the canvas. You cannot access it, even with XSS...

- Challenge: `http://{web.host}:{web.port}`
- Admin bot: `http://{bot.host}:{bot.port}`

## Attachments

- [canvasbox](distfiles)

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
    -e CONNECTBACK_URL=http://attacker.example.com \
    -p 8080:8080 --network=host \
    (docker build -q ./solution)
```
where `http://attacker.example.com` is an origin forwarded to `http://localhost:8080`.
