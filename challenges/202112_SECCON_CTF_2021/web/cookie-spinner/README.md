# [web] Cookie Spinner

## Description

Do you like cookies? If so, go `[here](http://153.127.199.64:3000)` now!

## Attachments

- [dist](files/dist)

## Usage

Launch a challenge server:

```
docker compose up
```

Run the author's solver:

```
docker run -it \
    -e SECCON_URL=http://localhost:3000 \
    -e HOOK_URL=http://attacker.example.com \
    -p 8080:8080 --network=host \
    (docker build -q ./solver)
```

where `http://attacker.example.com` is an origin forwarded to `http://localhost:8080`.

## Flag

```
SECCON{4r3_U_pLayin6_sP1n_Sp1N_c00k13_clicK3r?}
```
