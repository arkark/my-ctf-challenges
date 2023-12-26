const fs = require("node:fs").promises;
const execFile = require("node:util").promisify(
  require("node:child_process").execFile
);

const app = require("fastify")();
const PORT = 3000;

app.get("/", async (req, res) => {
  const html = await fs.readFile("index.html");
  res.type("html").send(html);
});

app.post("/", async (req, res) => {
  const { expr } = req.body;

  const proc = await execFile("node", ["whitespace.js", expr], {
    timeout: 2000,
  }).catch((e) => e);

  res.send(proc.killed ? "Timeout" : proc.stdout);
});

app.listen({ port: PORT, host: "0.0.0.0" }).catch((err) => {
  app.log.error(err);
  process.exit(1);
});
