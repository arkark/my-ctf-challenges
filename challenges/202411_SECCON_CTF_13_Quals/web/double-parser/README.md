# [web] double-parser

## Description

HTML parsers are effective in detecting XSS attacks :)

- Challenge: `http://double-parser.seccon.games:3000`
- Admin bot: `http://double-parser.seccon.games:1337`

## Attachments

- [double-parser](files)

## Usage

Launch a challenge server:

```
cd build
docker compose up
```

Run the author's solver:
```
docker run -it --rm \
    -e SECCON_HOST=localhost \
    -e ATTACKER_BASE_URL=http://attacker.example.com \
    -p 8080:8080 --network=host \
    (docker build -q ./solver)
```

where `http://attacker.example.com` is an origin forwarded to `http://localhost:8080`.
