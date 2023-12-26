# [web] babywaf

## Description

Do you want a flag? 🚩🚩🚩

- Challenge: `http://babywaf.{int,dom}.seccon.games:3000`

[babywaf](files/babywaf)

## Usage

Launch a challenge server:

```
cd build
docker compose up
```

Run the author's solver:
```
docker run -it --rm \
    -e WEB_BASE_URL=http://localhost:3000 \
    --network=host \
    (docker build -q ./solver)
```
