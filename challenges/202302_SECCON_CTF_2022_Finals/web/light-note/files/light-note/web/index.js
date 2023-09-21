const fastify = require("fastify")({
  trustProxy: !!process.env.TRUST_PROXY,
});
const crypto = require("node:crypto");
const fs = require("node:fs").promises;

const APP_PORT = process.env.APP_PORT ?? "3000";

fastify.register(require("@fastify/formbody"));
fastify.register(require("./report"), { prefix: "/report" });

const db = require("./db");

fastify.register(require("@fastify/cookie"));
fastify.register(require("@fastify/session"), {
  secret: crypto.randomBytes(32).toString("base64"),
  cookie: { secure: false },
});

fastify.get("/logout", async (req, reply) => {
  await req.session.destroy();
  return reply.redirect("/");
});

fastify.register((userApi, opts, done) => {
  userApi.addHook("preHandler", (req, reply, next) => {
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

  userApi.get("/", async (req, reply) => {
    const html = (await fs.readFile("index.html")).toString();
    return reply.type("text/html; charset=utf-8").send(html);
  });

  userApi.get("/api/notes", async (req, reply) => {
    return req.user.getNotes();
  });

  userApi.post("/api/notes/create", async (req, reply) => {
    const { note } = req.body;
    if (typeof note !== "string") {
      return reply.code(400).send("Invalid note");
    }
    req.user.createNote(note);
  });

  userApi.post("/api/notes/delete", async (req, reply) => {
    const { index } = req.body;
    req.user.deleteNote(Number(index));
  });

  done();
});

fastify.listen({ port: APP_PORT, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening at "${address}"`);
});
