const app = new (require("koa"))();
const execFile = require("util").promisify(require("child_process").execFile);

const PORT = process.env.PORT ?? "3000";

// WAF
app.use(async (ctx, next) => {
  await next();
  if (JSON.stringify(ctx.body).match(/SECCON{\w+}/)) {
    ctx.body = "🤔";
  }
});

app.use(async (ctx) => {
  const path = decodeURI(ctx.path.slice(1)) || "index.html";
  try {
    const proc = await execFile(
      "curl",
      [`file://${process.cwd()}/public/${path}`],
      { timeout: 1000 }
    );
    ctx.type = "text/html; charset=utf-8";
    ctx.body = proc.stdout;
  } catch (err) {
    ctx.body = err;
  }
});

app.listen(PORT);
