import Fastify from "fastify";
import crypto from "node:crypto";
import { promises as fs } from "node:fs";

const app = Fastify();
const PORT = 3000;

// A simple template engine!
const render = async (view, params) => {
  const tmpl = await fs.readFile(`views/${view}.html`, { encoding: "utf8" });
  const html = Object.entries(params).reduce(
    (prev, [key, value]) => prev.replace(`{{${key}}}`, value),
    tmpl
  );
  return html;
};

app.addHook("onRequest", (req, res, next) => {
  const nonce = crypto.randomBytes(16).toString("hex");
  res.header("Content-Security-Policy", `script-src 'nonce-${nonce}';`);
  req.nonce = nonce;
  next();
});

app.get("/", async (req, res) => {
  const html = await render("index", {});
  res.type("text/html").send(html);
});

app.get("/note", async (req, res) => {
  const title = String(req.query.title);
  const content = String(req.query.content);

  const html = await render("note", {
    nonce: req.nonce,
    data: JSON.stringify({ title, content }),
  });
  res.type("text/html").send(html);
});

app.listen({ port: PORT, host: "0.0.0.0" });
