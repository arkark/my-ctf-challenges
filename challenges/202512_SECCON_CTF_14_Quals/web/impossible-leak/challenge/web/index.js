import express from "express";
import session from "express-session";
import crypto from "node:crypto";

const db = new Map();
const getNotes = (id) => {
  if (!db.has(id)) db.set(id, []);
  return db.get(id);
};

const app = express()
  .set("view engine", "ejs")
  .use(express.urlencoded())
  .use(
    session({
      secret: crypto.randomBytes(16).toString("base64"),
      resave: false,
      saveUninitialized: true,
    })
  );

app.get("/", (req, res) => {
  const { query = "" } = req.query;
  const notes = getNotes(req.session.id).filter((note) => note.includes(query));
  res.render("index", { notes });
});

app.post("/new", (req, res) => {
  const note = String(req.body.note).slice(0, 1024);
  getNotes(req.session.id).push(note);
  res.redirect("/");
});

app.listen(3000);
