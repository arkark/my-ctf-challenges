FROM denoland/deno:1.45.2

WORKDIR /app

COPY flag.txt /
COPY main.ts .

USER deno
CMD ["run", "-A", "main.ts"]
