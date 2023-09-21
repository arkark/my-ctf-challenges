const fastify = require("fastify")();
const fs = require("node:fs").promises;
const execFile = require("util").promisify(require("child_process").execFile);

const PORT = process.env.PORT ?? "3000";

fastify.get("/", async (req, reply) => {
  const html = await fs.readFile("index.html");
  return reply.type("text/html; charset=utf-8").send(html);
});

fastify.post("/calc", async (req, reply) => {
  const { expr } = req.body;
  try {
    const result = await execFile("node", ["./calc.js", expr.toString()], {
      timeout: 1000,
    });
    return result.stdout;
  } catch (err) {
    return reply.code(500).send(err.killed ? "Timeout" : err);
  }
});

fastify.listen({ port: PORT, host: "0.0.0.0" });
