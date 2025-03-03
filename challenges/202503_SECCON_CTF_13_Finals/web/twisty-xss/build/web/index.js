import fastify from "fastify";
import sanitizeHtml from "sanitize-html";

sanitizeHtml.defaults.allowedTags.push("form", "input", "button");
Object.assign(sanitizeHtml.defaults.allowedAttributes, {
  "*": ["method", "action", "name", "type"],
});

const indexHtml = `
<!DOCTYPE html>
<html>
<body>
  Hello, {{name}}!
  <form method="get" action="/">
    <input name="name" type="text">
    <button type="submit">Submit</button>
  </form>
</body>
</html>
`.trimStart();

const encodeHtml = (unsafe) =>
  String(unsafe)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("{", "&#x7B;")
    .replaceAll("}", "&#x7D;");

const template = (html, params) => {
  const tag = /<\w+/g;

  for (const [key, value_s] of Object.entries(params)) {
    const values = Array.isArray(value_s) ? value_s : [value_s];

    for (const value of values) {
      // If there is no effect, skip
      if (!html.includes(`{{${key}}}`)) continue;

      // Replace with the key-value pair
      html = html.replaceAll(`{{${key}}}`, encodeHtml(value)).slice(0, 1024);

      // If it contains HTML tags, sanitize them
      if (tag.test(html)) html = sanitizeHtml(html);
    }
  }
  return html;
};

fastify()
  .get("/", (req, res) =>
    res.type("text/html; charset=utf-8").send(template(indexHtml, req.query))
  )
  .listen({ port: 3000, host: "0.0.0.0" });
