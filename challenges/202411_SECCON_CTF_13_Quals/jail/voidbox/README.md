# [jail] voidbox

## Description

🇻 🇴 🇮 🇩

```
nc voidbox.seccon.games 5000
```

## Authors

Ark & Satoooon

## Attachments

- [voidbox](files)

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
