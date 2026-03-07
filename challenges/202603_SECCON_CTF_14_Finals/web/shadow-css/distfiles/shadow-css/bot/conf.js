import { firefox } from "playwright-firefox";

export const challenge = {
  name: "Shadow CSS",
  appUrl: new URL("http://web:3000"),
  rateLimit: 4, // max requests per 1 minute
};

export const flag = {
  value: process.env.FLAG,
  validate: (flag) => typeof flag === "string" && /^SECCON\{\w+\}$/.test(flag),
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const browser = await firefox.launch({
  headless: true,
  firefoxUserPrefs: {
    "javascript.options.wasm": false,
    "javascript.options.baselinejit": false,
  },
});
process.on("SIGTERM", () => browser.close().then(() => process.exit(0)));

export const visit = async (url, token) => {
  console.log(`start: ${url}`);

  const context = await browser.newContext();
  await context.addCookies([
    {
      name: "TOKEN",
      value: token,
      url: challenge.appUrl.href,
      httpOnly: true,
    },
  ]);

  try {
    const page = await context.newPage();
    await page.goto(url, { timeout: 5_000 });
    await sleep(10_000);
    await page.close();
  } catch (e) {
    console.error(e);
  }
  await context.close();

  console.log(`end: ${url}`);
};
