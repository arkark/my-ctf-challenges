import fastify from "fastify";
import path from "node:path";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import sanitizeHtml from "sanitize-html";

const app = fastify();

app.register(await import("@fastify/jwt"), {
  secret: crypto.randomBytes(32),
  cookie: { cookieName: "session" },
});
app.register(await import("@fastify/cookie"));

app.register(await import("@fastify/static"), {
  root: path.join(import.meta.dirname, "public"),
  prefix: "/",
});

const maybeXss = (req) => {
  for (const items of [req.query, req.body ?? {}]) {
    for (const [key, value] of Object.entries(items)) {
      if (sanitizeHtml(key) !== key) return true;
      if (sanitizeHtml(value) !== value) return true;
    }
  }
  return false;
};

app.addHook("onSend", async (req, reply) => {
  try {
    if (maybeXss(req)) {
      reply.clearCookie("session");
      return "XSS?";
    }
  } catch {
    reply.status(500);
  }
});

const escapeHtml = (unsafe) =>
  unsafe
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const getNoteIds = (req) =>
  req
    .jwtVerify()
    .then(() => req.user.noteIds)
    .catch(() => []);

app.get("/notes", async (req, reply) => reply.send(await getNoteIds(req)));

app.post("/create", async (req, reply) => {
  const title = escapeHtml(String(req.body.title));
  const content = escapeHtml(String(req.body.content));
  if (title.length > 25 || content.length > 5000) {
    return reply.status(400).send({ msg: "Too long" });
  }

  const note = { title, content };
  const id = crypto.randomUUID();
  await fs.writeFile(`./public/notes/${id}.json`, JSON.stringify(note));

  const noteIds = await getNoteIds(req);
  noteIds.push(id);
  reply
    .setCookie("session", await reply.jwtSign({ noteIds }))
    .send({ msg: "Success" });
});

app.listen({ port: 3000, host: "0.0.0.0" });
