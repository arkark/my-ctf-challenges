import express from "express";

const indexHtml = `
<title>HTML Viewer</title>
<link rel="stylesheet" href="https://unpkg.com/bamboo.css/dist/light.min.css">
<body>
  <h1>HTML Viewer</h1>
  <form action="/view">
    <p><textarea name="html"></textarea></p>
    <div style="text-align: center">
      <input type="submit" value="Render">
    </div>
  </form>
</body>
`.trim();

express()
  .get("/", (req, res) => res.type("html").send(indexHtml))
  .get("/view", (req, res) => {
    const html = String(req.query.html ?? "?").slice(0, 1024);

    if (
      req.header("Sec-Fetch-Site") === "same-origin" &&
      req.header("Sec-Fetch-Dest") !== "document"
    ) {
      // XSS detection is unnecessary because it is definitely impossible for this request to trigger an XSS attack.
      res.type("html").send(html);
      return;
    }

    if (/script|src|on|html|data|&/i.test(html)) {
      res.type("text").send(`XSS Detected: ${html}`);
    } else {
      res.type("html").send(html);
    }
  })
  .listen(3000);
