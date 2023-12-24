import type { AppProps } from "$fresh/server.ts";
import { CSS } from "$gfm";

export default function App({ Component }: AppProps) {
  return (
    <html data-theme="light">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>LemonMD</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/simpledotcss/simple.min.css"
        />
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </head>
      <body>
        <main>
          <Component />
        </main>
      </body>
    </html>
  );
}
