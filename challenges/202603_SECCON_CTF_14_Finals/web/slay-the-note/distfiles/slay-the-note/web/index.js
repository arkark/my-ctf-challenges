import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "@koa/bodyparser";
import sanitize from "sanitize-html";
import fs from "node:fs";
import crypto from "node:crypto";

const app = new Koa();
app.use(bodyParser());

app.use((ctx, next) => {
  const nonce = crypto.randomBytes(8).toString("base64");
  ctx.set(
    "Content-Security-Policy",
    `script-src 'nonce-${nonce}'; style-src 'nonce-${nonce}'; base-uri 'none'`,
  );
  ctx.nonce = nonce;

  ctx.notes = ((v) => (v ? v.split("|") : []))(ctx.cookies.get("notes"));
  next();
  ctx.cookies.set("notes", ctx.notes.join("|"));
});

const router = new Router()
  .get("/", (ctx) => {
    ctx.type = "html";
    ctx.body = fs
      .readFileSync("index.html", { encoding: "utf-8" })
      .replaceAll("{{NONCE}}", () => ctx.nonce);
  })
  .get("/notes", (ctx) => {
    ctx.type = "json";
    ctx.body = ctx.notes;
  })
  .post("/new", (ctx) => {
    const note = sanitize(
      `<article>${String(ctx.request.body.note).slice(0, 1024)}</article>`,
    );
    ctx.notes.push(note);
    ctx.notes.sort();
    ctx.redirect("/");
  });

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
