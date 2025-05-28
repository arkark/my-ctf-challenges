import Fastify from "fastify";
import fs from "node:fs/promises";

const fastify = Fastify();

fastify.get("/", async (req, reply) => {
  const html = await fs.readFile("index.html");
  return reply.type("text/html").send(html);
});

await fastify.listen({ port: 3000, host: "0.0.0.0" });
