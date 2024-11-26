import fastify from "fastify";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import db from "./db.js";

const FLAG = process.env.FLAG ?? console.log("No flag") ?? process.exit(1);
const TRILLION = 1_000_000_000_000;

const app = fastify();

app.register(await import("@fastify/jwt"), {
  secret: crypto.randomBytes(32),
  cookie: { cookieName: "session" },
});
app.register(await import("@fastify/cookie"));

const names = new Set();

const auth = async (req, res) => {
  try {
    await req.jwtVerify();
  } catch {
    return res.status(401).send({ msg: "Unauthorized" });
  }
};

app.post("/api/register", async (req, res) => {
  const name = String(req.body.name);
  if (!/^[a-z0-9]+$/.test(name)) {
    res.status(400).send({ msg: "Invalid name" });
    return;
  }
  if (names.has(name)) {
    res.status(400).send({ msg: "Already exists" });
    return;
  }
  names.add(name);

  const [result] = await db.query("INSERT INTO users SET ?", {
    name,
    balance: 10,
  });
  res
    .setCookie("session", await res.jwtSign({ id: result.insertId }))
    .send({ msg: "Succeeded" });
});

app.get("/api/me", { onRequest: auth }, async (req, res) => {
  try {
    const [{ 0: { balance } }] = await db.query("SELECT * FROM users WHERE id = ?", [req.user.id]);
    req.user.balance = balance;
  } catch (err) {
    return res.status(500).send({ msg: err.message });
  }
  if (req.user.balance >= TRILLION) {
    req.user.flag = FLAG; // 💰
  }
  res.send(req.user);
});

app.post("/api/transfer", { onRequest: auth }, async (req, res) => {
  const recipientName = String(req.body.recipientName);
  if (!names.has(recipientName)) {
    res.status(404).send({ msg: "Not found" });
    return;
  }

  const [{ 0: { id } }] = await db.query("SELECT * FROM users WHERE name = ?", [recipientName]);
  if (id === req.user.id) {
    res.status(400).send({ msg: "Self-transfer is not allowed" });
    return;
  }

  const amount = parseInt(req.body.amount);
  if (!isFinite(amount) || amount <= 0) {
    res.status(400).send({ msg: "Invalid amount" });
    return;
  }

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [{ 0: { balance } }] = await conn.query("SELECT * FROM users WHERE id = ? FOR UPDATE", [
      req.user.id,
    ]);
    if (amount > balance) {
      throw new Error("Invalid amount");
    }

    await conn.query("UPDATE users SET balance = balance - ? WHERE id = ?", [
      amount,
      req.user.id,
    ]);
    await conn.query("UPDATE users SET balance = balance + ? WHERE name = ?", [
      amount,
      recipientName,
    ]);

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    return res.status(500).send({ msg: err.message });
  } finally {
    db.releaseConnection(conn);
  }

  res.send({ msg: "Succeeded" });
});

app.get("/", async (req, res) => {
  const html = await fs.readFile("index.html");
  res.type("text/html; charset=utf-8").send(html);
});

app.listen({ port: 3000, host: "0.0.0.0" });
