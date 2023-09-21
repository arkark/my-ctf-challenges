# [misc] latexipy

## Description

Latexify as a Service

```
nc latexipy.seccon.games 2337
```

[latexipy](files/latexipy)

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
    -e SECCON_PORT=2337 \
    --network=host \
    (docker build -q ./solver)
```

## Flag

```
SECCON{UTF7_is_hack3r_friend1y_encoding}
```