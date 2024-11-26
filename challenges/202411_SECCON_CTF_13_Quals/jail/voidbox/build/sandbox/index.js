const fs = require("node:fs").promises;
const { promisify } = require("node:util");
const { execFile } = require("node:child_process");

const app = require("fastify")();
const PORT = 3000;

app.get("/", async (req, res) => {
  const html = await fs.readFile("index.html");
  res.type("html").send(html);
});

app.post("/", async (req, res) => {
  const { code } = req.body;

  const proc = await promisify(execFile)("node", ["sandbox.js", code], {
    timeout: 2000,
  }).catch((e) => e);

  res.send(proc.killed ? "timeout" : proc.stdout);
});

app.listen({ port: PORT, host: "0.0.0.0" });
