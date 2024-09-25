import express from "express";
import expressSession from "express-session";
import ejs from "ejs";
import { JSDOM } from "jsdom";
import crypto from "node:crypto";
import fs from "node:fs";

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");

app.use(
  expressSession({
    secret: crypto.randomBytes(32).toString("base64"),
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.urlencoded({ extended: true }));

const getIntegrity = (content) => {
  const algo = "sha256";
  const value = crypto
    .createHash(algo)
    .update(Buffer.from(content))
    .digest()
    .toString("base64");
  return `${algo}-${value}`;
};

app.use((req, res, next) => {
  const notes = req.session.notes ?? [];
  res.locals.notes = notes;

  const hashSource = notes
    .map((note) => `'${getIntegrity(JSON.stringify(note))}'`)
    .join(" ");

  const nonce = crypto.randomBytes(16).toString("base64");
  res.header(
    "Content-Security-Policy",
    `script-src 'nonce-${nonce}' ${hashSource};`
  );
  res.locals.nonce = nonce;

  next();
});

const SCRIPTS_TMPL = `
<div id="scripts">
  <% for (const note of notes) { %>
    <% const json = JSON.stringify(note); %>
    <script type="application/json" integrity="<%= getIntegrity(json) %>"><%- json %></script>
  <% } %>
</div>
`.trim();

app.get("/", (req, res) => {
  const scripts = new JSDOM(
    ejs.render(SCRIPTS_TMPL, {
      notes: res.locals.notes,
      getIntegrity,
    })
  ).window.scripts?.innerHTML;

  res.render("index", { scripts });
});

app.post("/create", (req, res) => {
  const notes = res.locals.notes;
  notes.push(req.body);
  req.session.notes = notes;
  res.redirect("/");
});

app.get("/app.js", (req, res) => {
  const js = fs.readFileSync("app.js");
  res.type("text/javascript").send(js);
});

app.listen({ port: PORT, host: "0.0.0.0" });
