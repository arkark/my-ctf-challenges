# [web] bffcalc

## Description

There is a simple calculator!

- `http://bffcalc.seccon.games:3000`

## Attachments

- [bffcalc](files)

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

## Flag

```
SECCON{i5_1t_p0ssible_tO_s7eal_http_only_cooki3_fr0m_XSS}
```
