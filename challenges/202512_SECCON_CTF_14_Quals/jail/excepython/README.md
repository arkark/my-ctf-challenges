# [jail] excepython

## Description

Exception-Oriented Programming

```
nc excepython.seccon.games 5000
```

## Attachments

- [excepython](distfiles)

## Usage

Launch a challenge server:

```
cd challenge
docker compose up
```

Run the author's solver:

```
docker run -it \
    -e SECCON_HOST=localhost \
    -e SECCON_PORT=5000 \
    --network=host \
    (docker build -q ./solution)
```
