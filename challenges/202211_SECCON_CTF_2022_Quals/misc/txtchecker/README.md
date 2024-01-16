# [misc] txtchecker

## Description

I'm creating a text file checker. It still in the process of implementation...

```
sshpass -p ctf ssh -oStrictHostKeyChecking=no -oCheckHostIP=no ctf@txtchecker.seccon.games -p 2022
```

## Attachments

- [txtchecker](files/txtchecker)

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
    -e SECCON_PORT=2022 \
    --network=host \
    (docker build -q ./solver)
```

## Flag

```
SECCON{reDo5L1fe}
```
