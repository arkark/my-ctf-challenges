# [web] Sequence as a Service 1

## Description

I've heard that SaaS is very popular these days. So, I developed it, too. You can access it `[here](http://sequence-as-a-service-1.quals.seccon.jp:3000)`.

Note: It is possible to solve SaaS 2 even if you don't solve SaaS 1.

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
    --network=host \
    (docker build -q ./solver)
```
