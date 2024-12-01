import express from "express";

const html = `
<h1>Treasure Hunt 👑</h1>
<p>Can you find a treasure?</p>
<ul>
  <li><a href=/book>/book</a></li>
  <li><a href=/drum>/drum</a></li>
  <li><a href=/duck>/duck</a></li>
  <li><a href=/key>/key</a></li>
  <li><a href=/pen>/pen</a></li>
  <li><a href=/tokyo/tower>/tokyo/tower</a></li>
  <li><a href=/wind/chime>/wind/chime</a></li>
  <li><a href=/alpaca>/alpaca</a></li>
</ul>
`.trim();

const app = express();

app.use((req, res, next) => {
  res.type("text");
  if (/[flag]/.test(req.url)) {
    res.status(400).send(`Bad URL: ${req.url}`);
    return;
  }
  next();
});

app.use(express.static("public"));

app.get("/", (req, res) => res.type("html").send(html));

app.listen(3000);
