FROM oven/bun:1.1.36

WORKDIR /app

COPY *.json *.lockb ./
RUN bun install

COPY index.ts ./
CMD bun run index.ts
