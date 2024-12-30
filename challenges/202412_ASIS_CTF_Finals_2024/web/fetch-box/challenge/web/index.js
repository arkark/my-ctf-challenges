import express from "express";
import fs from "node:fs";

const html = fs.readFileSync("index.html", { encoding: "utf8" });

express()
  .use("/", (req, res, next) => {
    res.setHeader(
      "Content-Security-Policy",
      "base-uri 'none'; frame-ancestors 'none'"
    );
    next();
  })
  .get("/", (req, res) => res.type("html").send(html))
  .get("/ping", (req, res) => res.type("text").send("pong"))
  .listen(3000);
