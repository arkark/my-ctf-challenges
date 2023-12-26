# [web] LemonMD

## Description

🍋📝✨

- Challenge: `http://lemonmd.{int,dom}.seccon.games:3000`
- Admin bot: `http://lemonmd.{int,dom}.seccon.games:1337`

[lemonmd](files/lemonmd)

## Usage

Launch a challenge server:

```
cd build
docker compose up
```

Run the author's solver:
```
docker run -it --rm \
    -e WEB_BASE_URL=http://localhost:3000 \
    -e BOT_BASE_URL=http://localhost:1337 \
    -e ATTACKER_BASE_URL=http://attacker.example.com \
    -p 8080:8080 --network=host \
    (docker build -q ./solver)
```
