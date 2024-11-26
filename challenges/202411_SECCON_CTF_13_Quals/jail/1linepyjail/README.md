# [jail] 1linepyjail

## Description

1 line :)

```
nc 1linepyjail.seccon.games 5000
```

## Attachments

- [1linepyjail](files)

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
