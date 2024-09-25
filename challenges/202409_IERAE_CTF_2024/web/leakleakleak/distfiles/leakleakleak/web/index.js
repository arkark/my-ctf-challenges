import fastify from "fastify";
import ejs from "ejs";
import crypto from "node:crypto";

import db from "./db.js";

const PORT = 3000;
const app = fastify({});

app.register(await import("@fastify/view"), {
  engine: { ejs },
  root: "./views",
});
app.register(await import("@fastify/formbody"));
app.register(await import("@fastify/cookie"));
app.register(await import("@fastify/session"), {
  secret: crypto.randomBytes(32).toString("base64"),
  cookie: { secure: false },
});

app.addHook("onRequest", (req, reply, next) => {
  req.nonce = crypto.randomBytes(16).toString("base64");
  reply.header(
    "Content-Security-Policy",
    `default-src 'none'; style-src 'nonce-${req.nonce}';`
  );
  next();
});

app.addHook("preHandler", (req, reply, next) => {
  const userId =
    req.session.get("userId") ??
    (() => {
      const user = db.createUser();
      req.session.set("userId", user.id);
      return user.id;
    })();

  req.user = db.getUser(userId);
  next();
});

app.get("/clear", async (req, reply) => {
  await req.session.destroy();
  return reply.redirect("/");
});

app.post("/create", (req, reply) => {
  const note = String(req.body.note);
  if (note.length > 2 ** 10) {
    return reply.code(400).send("Too long parameters");
  }
  req.user.createNote(note);
  return reply.redirect("/");
});

app.post("/delete", (req, reply) => {
  const index = parseInt(req.body.index);
  req.user.deleteNote(index);
  return reply.redirect("/");
});

app.get("/", (req, reply) => {
  const { query } = req.query;
  const notes = req.user
    .getNotes()
    .map((note) =>
      query ? note.replaceAll(query, '<span class="highlight">$&</span>') : note
    );
  reply.view("index.ejs", { nonce: req.nonce, notes });
});

app.listen({ port: PORT, host: "0.0.0.0" });
