# [jail] Go to Jail

## Description

ʕ◔ϖ◔ʔ Go Language Jail Challenge ʕ◔ϖ◔ʔ

```
nc go-to-jail.seccon.games 5000
```

## Attachments

- [go-to-jail](files)

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
