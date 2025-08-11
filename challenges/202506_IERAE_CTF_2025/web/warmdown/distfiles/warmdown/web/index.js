import fastify from "fastify";
import * as marked from "marked";
import path from "node:path";

const app = fastify();

app.register(await import("@fastify/static"), {
  root: path.join(import.meta.dirname, "public"),
  prefix: "/",
});

const sanitize = (unsafe) => unsafe.replaceAll("<", "＜").replaceAll(">", "＞");

const escapeHtml = (str) =>
  str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const unescapeHtml = (str) =>
  str
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#039;", "'");

app.get("/render", async (req, reply) => {
  const markdown = sanitize(String(req.query.markdown));
  if (markdown.length > 1024) {
    return reply.status(400).send("Too long");
  }

  const escaped = escapeHtml(marked.parse(markdown));
  const unescaped = unescapeHtml(escaped);

  return { escaped, unescaped };
});

app.listen({ port: 3000, host: "0.0.0.0" });
