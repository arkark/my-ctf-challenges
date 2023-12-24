const express = require("express");
const fs = require("fs/promises");

const app = express();
const PORT = 3000;

const FLAG = process.env.FLAG ?? console.log("No flag") ?? process.exit(1);

app.use(express.json());

app.post("/", async (req, res) => {
  if ("givemeflag" in req.body) {
    res.send(FLAG);
  } else {
    res.status(400).send("🤔");
  }
});

app.get("/", async (_req, res) => {
  const html = await fs.readFile("index.html");
  res.type("html").send(html);
});

app.listen(PORT);
