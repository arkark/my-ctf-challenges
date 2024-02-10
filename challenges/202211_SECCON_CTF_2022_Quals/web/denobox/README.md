# [web] denobox

## Description

Your program runs in a sandbox!

- `http://denobox.seccon.games:3000`

## Attachments

- [denobox](files/denobox)

## Usage

Launch a challenge server:

```
cd build
docker compose up
```

Run the author's solver:

```
docker run -it \
    -e SECCON_BASE_URL=http://localhost:3000 \
    -e ATTACK_BASE_URL=http://attacker.example.com \
    -p 8080:8080 --network=host \
    (docker build -q ./solver)
```
