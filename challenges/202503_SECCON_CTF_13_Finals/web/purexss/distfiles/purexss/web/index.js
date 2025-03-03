import fastify from "fastify";
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";

const validate = (html) => {
  if (typeof html !== "string") throw "Invalid type";
  if (html.length > 1024) throw "Too long";

  // Do not use ISO-2022-JP
  // ref. https://www.sonarsource.com/blog/encoding-differentials-why-charset-matters/
  if (html.includes("\x1b")) throw "Invalid character";

  return html;
};

const sanitize = (html) => {
  const DOMPurify = createDOMPurify(new JSDOM("").window);
  DOMPurify.addHook("afterSanitizeAttributes", (node) => {
    for (const { value } of node.attributes) {
      if (/[^\w</>]/.test(value)) throw "Invalid attribute value";
    }
  });

  return DOMPurify.sanitize(html, { WHOLE_DOCUMENT: true });
};

const defaultHtml = `
<body>
  <h1>HTML Viewer</h1>
  <form action="/">
    <p>
      <textarea name="html" placeholder="<p>hello</p>"></textarea>
    </p>
    <input type="submit" value="Render">
  </form>
</body>
`.trim();

fastify()
  .get("/", async (req, reply) => {
    try {
      const html = sanitize(validate(req.query.html ?? defaultHtml));
      reply.type("text/html").send(html);
    } catch (err) {
      reply.type("text/plain").code(400).send(err);
    }
  })
  .listen({ port: 3000, host: "0.0.0.0" });
