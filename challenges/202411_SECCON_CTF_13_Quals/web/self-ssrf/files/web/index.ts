import express from "express";

const PORT = 3000;
const LOCALHOST = new URL(`http://localhost:${PORT}`);
const FLAG = Bun.env.FLAG!!;

const app = express();

app.use("/", (req, res, next) => {
  if (req.query.flag === undefined) {
    const path = "/flag?flag=guess_the_flag";
    res.send(`Go to <a href="${path}">${path}</a>`);
  } else next();
});

app.get("/flag", (req, res) => {
  res.send(
    req.query.flag === FLAG // Guess the flag
      ? `Congratz! The flag is '${FLAG}'.`
      : `<marquee>🚩🚩🚩</marquee>`
  );
});

app.get("/ssrf", async (req, res) => {
  try {
    const url = new URL(req.url, LOCALHOST);

    if (url.hostname !== LOCALHOST.hostname) {
      res.send("Try harder 1");
      return;
    }
    if (url.protocol !== LOCALHOST.protocol) {
      res.send("Try harder 2");
      return;
    }

    url.pathname = "/flag";
    url.searchParams.append("flag", FLAG);
    res.send(await fetch(url).then((r) => r.text()));
  } catch {
    res.status(500).send(":(");
  }
});

app.listen(PORT);
