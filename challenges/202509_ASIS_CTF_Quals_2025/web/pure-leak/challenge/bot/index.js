import express from "express";
import rateLimit from "express-rate-limit";
import crypto from "node:crypto";

import { visit, challenge, flag } from "./conf.js";

if (!flag.validate(flag.value)) {
  console.log(`Invalid flag: ${flag.value}`);
  process.exit(1);
}

const app = express();

app.use(express.json());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", {
    name: challenge.name,
    appUrl: challenge.appUrl.origin,
  });
});

app.use(
  "/api",
  rateLimit({
    windowMs: 60_000,
    max: challenge.rateLimit,
  })
);

const tokens = new Set();

app.post("/api/report", async (req, res) => {
  const { url } = req.body;
  if (
    typeof url !== "string" ||
    (!url.startsWith("http://") && !url.startsWith("https://"))
  ) {
    return res.status(400).send("Invalid url");
  }

  const token = "TOKEN_" + crypto.randomBytes(8).toString("hex");

  tokens.add(token);
  setTimeout(() => {
    tokens.delete(token); // expired
  }, 60_000);

  try {
    await visit(url, token);
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.status(500).send("Something went wrong");
  }
});

app.post("/api/verify", (req, res) => {
  const { token } = req.body;

  if (tokens.has(token)) {
    res.send(flag.value); // 🚩
  } else {
    res.status(404).send("Not found");
  }
});

app.listen(1337);
