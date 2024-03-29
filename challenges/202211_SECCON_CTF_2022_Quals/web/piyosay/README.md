# [web] piyosay

## Description

I know the combination of DOMPurify and Trusted Types is a perfect defense for XSS attacks.

- `http://piyosay.seccon.games:3000`

## Attachments

- [piyosay](files/piyosay)

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

where `http://attacker.example.com` is an origin forwarded to `http://localhost:8080`.
