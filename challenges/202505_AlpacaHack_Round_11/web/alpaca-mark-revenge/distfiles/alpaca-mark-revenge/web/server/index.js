import express from "express";
import crypto from "node:crypto";

const DEFAULT_MARKDOWN = `
### Hi there :alpaca:

- alpaca
- giraffe
- camel

\`\`\`javascript
const emojis = ["🦙", "🦒", "🐫"];
alert(emojis[Math.random() * emojis.length | 0]);
\`\`\`

<center>Powered by AlpacaMark</center>
`.trimStart();

const app = express();

app
  .use(express.static("dist"))
  .set("view engine", "ejs")
  .set("views", "server/views");

app.get("/", (req, res) => {
  const nonce = crypto.randomBytes(16).toString("base64");
  res.setHeader(
    "Content-Security-Policy",
    `script-src 'strict-dynamic' 'nonce-${nonce}'; default-src 'self'; base-uri 'none'`
  );

  const markdown = req.query.markdown?.slice(0, 512) ?? DEFAULT_MARKDOWN;
  if (/<script/i.test(markdown)) {
    return res.status(400).send(":(");
  }

  res.render("index", {
    nonce,
    markdown,
  });
});

app.listen(3000);
