import express from "express";

const html = `
<h1>XSS Playground</h1>
<script>eval(new URLSearchParams(location.search).get("xss"));</script>
`;

express()
  .use("/", (req, res, next) => {
    res.setHeader(
      "Content-Security-Policy",
      [
        "script-src 'unsafe-inline' 'unsafe-eval'",
        "default-src 'none'",
        "base-uri 'none'",
        "frame-ancestors 'none'",
        "sandbox allow-scripts allow-same-origin",
      ].join("; ")
    );
    next();
  })
  .get("/{*any}", (req, res) => res.type("html").send(html))
  .all("/{*any}", (req, res) => res.socket.destroy())
  .use((err, req, res, next) => res.socket.destroy())
  .listen(3000);
