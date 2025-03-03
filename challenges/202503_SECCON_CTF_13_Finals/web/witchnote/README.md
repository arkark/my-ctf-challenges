# [web] witchnote

## Description

The trusted magic prevents XSS attacks 🧙‍♀️

- Challenge: `http://witchnote.{int,dom}.seccon.games:3000`
- Admin bot: `http://witchnote.{int,dom}.seccon.games:1337`

## Attachments

- [witchnote](distfiles)

## Usage

Launch a challenge server:

```sh
cd build
docker compose up
```

Run the author's solver:
```sh
docker run -it --rm \
    -e SECCON_HOST=localhost \
    -e ATTACKER_BASE_URL=http://attacker.example.com \
    -p 8080:8080 --network=host \
    (docker build -q ./solver)
```

where `http://attacker.example.com` is an origin forwarded to `http://localhost:8080`.
