import express from "express";
import rateLimit from "express-rate-limit";

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

app.post("/api/report", async (req, res) => {
  const { url } = req.body;
  if (
    typeof url !== "string" ||
    (!url.startsWith("http://") && !url.startsWith("https://"))
  ) {
    return res.status(400).send("Invalid url");
  }

  try {
    await visit(url);
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.status(500).send("Something went wrong");
  }
});

app.listen(1337);
