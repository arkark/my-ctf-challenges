# [jail] pp3

## Description

Did you solve [pp4](https://github.com/arkark/my-ctf-challenges/tree/main/challenges/202411_SECCON_CTF_13_Quals/jail/pp4) in Quals? The limitation of **4** was too large.

```
nc pp3.{int,dom}.seccon.games 5000
```

## Attachments

- [pp3](distfiles)

## Usage

Launch a challenge server:

```sh
cd build
docker compose up
```

Run the author's solver:
```sh
docker run -it \
    -e SECCON_HOST=localhost \
    --network=host \
    (docker build -q ./solver)
```
