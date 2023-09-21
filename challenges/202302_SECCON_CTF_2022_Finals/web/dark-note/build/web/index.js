const fastify = require("fastify")();
const crypto = require("node:crypto");
const path = require("node:path");

const APP_PORT = process.env.APP_PORT ?? "3000";
const BASIC_USERNAME = process.env.BASIC_USERNAME;
const BASIC_PASSWORD = process.env.BASIC_PASSWORD;

const runService = () => {
  fastify.register(require("@fastify/formbody"));
  fastify.register(require("./report"), { prefix: "/report" });

  const db = require("./db");

  fastify.register(require("@fastify/cookie"));
  fastify.register(require("@fastify/session"), {
    secret: crypto.randomBytes(32).toString("base64"),
    cookie: { secure: false },
  });

  fastify.register(require("@fastify/static"), {
    root: path.join(__dirname, "public"),
    serve: false,
  });

  fastify.get("/login", async (req, reply) => {
    return reply.sendFile("/login.html");
  });

  fastify.post("/login", async (req, reply) => {
    const { name, password } = req.body;

    if (typeof name !== "string" || typeof password !== "string") {
      return reply.code(400).send("Invalid params");
    }

    const user = db.getUserByName(name);
    if (user == null || user.name !== name || user.password !== password) {
      return reply.code(400).send("Failed to login");
    }

    req.session.set("userId", user.id);
    return reply.redirect("/");
  });

  fastify.get("/signup", async (req, reply) => {
    return reply.sendFile("/signup.html");
  });

  fastify.post("/signup", async (req, reply) => {
    const { name, password, emoji } = req.body;

    if (
      typeof name !== "string" ||
      typeof password !== "string" ||
      typeof emoji !== "string"
    ) {
      return reply.code(400).send("Invalid params");
    }
    if (name.length < 6 || password.length < 6) {
      return reply.code(400).send("Username or password is too short");
    }

    const user = db.createUser(name, password, emoji);
    req.session.set("userId", user.id);
    return reply.redirect("/");
  });

  fastify.get("/logout", async (req, reply) => {
    await req.session.destroy();
    return reply.redirect("/");
  });

  fastify.get("/api/emojis", async (req, reply) => {
    const emojis =
      "😺/😸/😹/😻/😼/😽/🙀/😿/😾/🐶/🐱/🐭/🐹/🐰/🦊/🐻/🐼/🐻‍❄️/🐨/🐯/🦁/🐮/🐷/🐽/🐸/🐵/🙈/🙉/🙊/🐒/🐔/🐧/🐦/🐤/🐣/🐥/🦆/🦅/🦉/🦇/🐺/🐗/🐴/🦄/🐝/🪱/🐛/🦋/🐌/🐞/🐜/🪰/🪲/🪳/🦟/🦗/🕷/🕸/🦂/🐢/🐍/🦎/🦖/🦕/🐙/🦑/🦐/🦞/🦀/🐡/🐠/🐟/🐬/🐳/🐋/🦈/🐊/🐅/🐆/🦓/🦍/🦧/🦣/🐘/🦛/🦏/🐪/🐫/🦒/🦘/🦬/🐃/🐂/🐄/🐎/🐖/🐏/🐑/🦙/🐐/🦌/🐕/🐩/🦮/🐕‍🦺/🐈/🐈‍⬛/🪶/🐓/🦃/🦤/🦚/🦜/🦢/🦩/🕊/🐇/🦝/🦨/🦡/🦫/🦦/🦥/🐁/🐀/🐿/🦔/🐾/🐉/🐲".split(
        "/"
      );
    return emojis;
  });

  fastify.register((userApi, opts, done) => {
    userApi.addHook("preHandler", (req, reply, next) => {
      const userId = req.session.get("userId");
      if (userId == null) {
        return reply.redirect("/login");
      }
      req.user = db.getUser(userId);
      if (req.user == null) {
        return reply.redirect("/login");
      }

      next();
    });

    userApi.get("/", async (req, reply) => {
      return reply.sendFile("index.html");
    });

    userApi.post("/api/emojis/change", async (req, reply) => {
      const { emoji } = req.body;
      if (typeof emoji !== "string") {
        return reply.code(400).send("Invalid emoji");
      }
      req.user.changeEmoji(emoji);
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
};

if (typeof BASIC_USERNAME === "undefined") {
  runService();
} else {
  // `instancer/instancer.js` uses Basic authentication

  fastify.register(require("@fastify/basic-auth"), {
    validate: async (username, password, req, reply) => {
      if (
        username.trim() !== BASIC_USERNAME ||
        password.trim() !== BASIC_PASSWORD
      ) {
        return new Error("Basic auth: failed");
      }
    },
    authenticate: true,
  });
  fastify.after(() => {
    fastify.addHook("onRequest", fastify.basicAuth);
    runService();
  });
}

fastify.listen({ port: APP_PORT, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening at "${address}"`);
});
