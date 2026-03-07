# [jail] increasing

## Description

a bb ccc dddd eeeee ffffff ggggggg ...

```
nc increasing.seccon.games 5000
```

## Attachments

- [increasing](distfiles)

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
