const fastify = require("fastify")();
const fs = require("node:fs").promises;
const crypto = require("node:crypto");

const PORT = process.env.PORT ?? "3000";

fastify.register(require("@fastify/formbody"));
fastify.register(require("./report"), { prefix: "/report" });

fastify.get("/", async (req, reply) => {
  const html = await fs.readFile("views/index.html");
  return reply.type("text/html; charset=utf-8").send(html);
});

const escapeHtml = (unsafeStr, offset1, length1, offset2, length2) => {
  return (
    unsafeStr.substring(0, offset1) +
    unsafeStr
      .substring(offset1, offset1 + length1)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;") +
    unsafeStr.substring(offset1 + length1, offset2) +
    unsafeStr
      .substring(offset2, offset2 + length2)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;") +
    unsafeStr.substring(offset2 + length2)
  );
};

fastify.post("/post", async (req, reply) => {
  const nonce = crypto.randomBytes(16).toString("base64");

  const originalLength = parseInt(req.body.originalLength);
  const minifiedLength = parseInt(req.body.minifiedLength);
  const minifiedCode = req.body.minifiedCode;

  const templateHtml = (await fs.readFile("views/result.html"))
    .toString()
    .replaceAll("{{CSP_NONCE}}", nonce)
    .replaceAll("{{ORIGINAL_LENGTH}}", originalLength)
    .replaceAll("{{MINIFIED_LENGTH}}", minifiedLength);
  const html = templateHtml.replaceAll("{{MINIFIED_CODE}}", minifiedCode);

  return reply.type("text/html; charset=utf-8").send(
    escapeHtml(
      html,

      // (offset, length) of the first {{MINIFIED_CODE}}:
      templateHtml.indexOf("{{MINIFIED_CODE}}"),
      minifiedLength,

      // (offset, length) of the second {{MINIFIED_CODE}}:
      templateHtml.lastIndexOf("{{MINIFIED_CODE}}") +
        (minifiedLength - "{{MINIFIED_CODE}}".length),
      minifiedLength
    )
  );
});

fastify.listen({ port: PORT, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening at "${address}"`);
});
