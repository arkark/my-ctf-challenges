import express from "express";
import crypto from "node:crypto";
import { $ } from "zx";

const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("/say", async (req, res) => {
  const { message = "Hello!" } = req.query;

  try {
    const uuid = crypto.randomUUID();
    await $({
      cwd: "public/out",
      timeout: "2s",
    })`/usr/games/cowsay ${message} > ${uuid}`;
    res.send({ uuid });
  } catch ({ exitCode }) {
    res.status(500).send(exitCode ? "error" : "timeout");
  }
});

app.listen(PORT);
