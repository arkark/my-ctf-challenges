# [web] Sequence as a Service 2

## Description

NEW FEATURE: You can get values from **two** sequences at the same time! Go `[here](http://sequence-as-a-service-2.quals.seccon.jp:3000)`.

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

## Flag

```
SECCON{45deg_P4sc4l_g3Ner4tes_Fib0n4CCi_5eq!}
```
