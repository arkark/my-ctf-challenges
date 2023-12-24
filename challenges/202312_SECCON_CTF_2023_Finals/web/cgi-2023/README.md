# [web] cgi-2023

## Description

CGI is one of the lost technologies.

- Challenge: `http://cgi-2023.{int,dom}.seccon.games:3000`
- Admin bot: `http://cgi-2023.{int,dom}.seccon.games:1337`

[cgi-2023](files/cgi-2023)

## Usage

Launch a challenge server:

```
cd files/cgi-2023
docker compose up
```

Run the author's solver:
ローカル:
```
docker run -it --rm \
    -e WEB_BASE_URL=http://localhost:3000 \
    -e BOT_BASE_URL=http://localhost:1337 \
    -e ATTACKER_BASE_URL=http://attacker.example.com \
    -p 8080:8080 --network=host \
    (docker build -q ./solver)
```
