import express from "express";
import cookieParser from "cookie-parser";
import crypto from "node:crypto";

const defaultHtml = `
<h1>HTML Viewer</h1>
<form action="/">
  <textarea name="html"></textarea>
  <input type="submit" value="Render">
</form>
`;

const app = express();

app.use(cookieParser());

app.use((req, res, next) => {
  res.type("text");
  next();
});

app.get("/", (req, res) => {
  const html = String(req.query.html ?? defaultHtml);

  if (html.length > 1024) return res.send("?");
  if (/[^\x20-\x7e\r\n]/i.test(html)) return res.send("??");
  if (/meta|link|src|data|href|svg|:|%|&|\\|\/\//i.test(html)) return res.send("???");

  res
    .type("html")
    .setHeader(
      "Content-Security-Policy",
      "default-src 'none'; base-uri 'none'; frame-ancestors 'none'"
    )
    .send(html.replace("{{TOKEN}}", req.cookies.TOKEN));
});

const tokens = new Map();

// For the admin bot
app.get("/save-flag", (req, res) => {
  const token = crypto.randomBytes(6).toString("hex");
  const flag = req.cookies.FLAG;
  tokens.set(token, flag);
  console.log({ token, flag });
  setTimeout(
    () => tokens.delete(token), // expired
    120_000
  );
  res.clearCookie("FLAG").cookie("TOKEN", token).send("Saved");
});

// If you steal a token, use it :)
app.get("/get", (req, res) => {
  const token = String(req.query.token);
  res.send(tokens.get(token) ?? "Not found");
});

app.listen(3000);
