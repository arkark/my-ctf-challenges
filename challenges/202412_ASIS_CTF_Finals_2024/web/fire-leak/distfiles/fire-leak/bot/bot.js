import { firefox } from "playwright-firefox";

const FLAG = process.env.FLAG ?? console.log("No flag") ?? process.exit(1);

const APP_HOST = "web";
const APP_PORT = "3000";
export const APP_URL = `http://${APP_HOST}:${APP_PORT}`;

// Flag format
if (!/^ASIS{\w+}$/.test(FLAG)) {
  console.log("Bad flag");
  process.exit(1);
}

const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const browser = await firefox.launch({
  headless: true,
  firefoxUserPrefs: {
    "javascript.options.wasm": false,
    "javascript.options.baselinejit": false,
  },
});

export const visit = async (url) => {
  console.log(`start: ${url}`);

  const context = await browser.newContext();
  await context.addCookies([
    {
      name: "FLAG",
      value: FLAG,
      url: APP_URL,
      httpOnly: true,
    },
  ]);

  try {
    const page1 = await context.newPage();
    await page1.goto(APP_URL + "/save-flag", { timeout: 3_000 });
    await sleep(2_000);
    await page1.close();

    const page2 = await context.newPage();
    await page2.goto(url, { timeout: 5_000 });
    await sleep(60_000);
    await page2.close();
  } catch (e) {
    console.error(e);
  }

  await context.close();

  console.log(`end: ${url}`);
};
