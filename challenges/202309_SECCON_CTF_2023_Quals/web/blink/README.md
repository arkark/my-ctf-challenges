# [web] blink

## Description

Popover API is supported from Chrome 114. The awesome API is so useful that you can easily implement `<blink>`.

- Challenge: `http://blink.seccon.games:3000`
- Admin bot: `http://blink.seccon.games:1337`

[blink](files/blink)

## Usage

Launch a challenge server:

```
cd build
docker compose up
```

Run the author's solver:

```
docker run -it \
    -e BOT_BASE_URL=http://localhost:1337 \
    -e ATTACKER_BASE_URL=http://attacker.example.com \
    -p 8080:8080 --network=host \
    (docker build -q ./solver)
```

where `http://attacker.example.com` is an origin forwarded to `http://localhost:8080`.

## Flag

```
SECCON{blink_t4g_is_no_l0nger_supported_but_String_ha5_blink_meth0d_y3t}
```
