# [jail] pp4

## Description

Let's enjoy the polluted programming💥

```
nc pp4.seccon.games 5000
```

## Attachments

- [pp4](files)

## Usage

Launch a challenge server:

```
cd build
docker compose up
```

Run the author's solver:
```
docker run -it \
    -e SECCON_HOST=localhost \
    --network=host \
    (docker build -q ./solver)
```
