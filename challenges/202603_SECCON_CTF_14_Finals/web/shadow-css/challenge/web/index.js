import express from "express";
import cookieParser from "cookie-parser";

const template = `
<!DOCTYPE html>
<html>
  <head>
    <style>{{CSS}}</style>
  </head>
  <body>
    <h1>Shadow CSS 👤</h1>
    <div>
      <template shadowrootmode="closed">
        <div data-token="{{TOKEN}}"></div>
      </template>
    </div>
  </body>
</html>
`.trim();

express()
  .use(cookieParser())
  .get("/", (req, res) => {
    const { css = "", k, v } = req.query;
    const TOKEN = req.cookies.TOKEN ?? "TOKEN_0123456789abcdef01234567";

    const html = template
      .replace("{{TOKEN}}", () => TOKEN.replace(/[<>"]/g, ""))
      .replace("{{CSS}}", () => css.replace(/[<>]/g, ""));

    if (k && v) res.header(k, v);
    res.type("html").end(html);
  })
  .listen(3000);
