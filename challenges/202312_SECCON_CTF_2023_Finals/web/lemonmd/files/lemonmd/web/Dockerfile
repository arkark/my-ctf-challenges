FROM denoland/deno:1.39.0

RUN mkdir /home/deno && chown deno:deno /home/deno
WORKDIR /app
COPY . .

USER deno
RUN deno cache main.ts

CMD ["task", "preview"]
