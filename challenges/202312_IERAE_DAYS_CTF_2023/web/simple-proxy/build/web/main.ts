const description = `
This is a simple proxy server.

Usage:
curl "http://example.com" --proxy "${Deno.env.get("APP_HOST")}"
`.trim();

Deno.serve({ port: 3000 }, (req) => {
  const proxy = new Request(req.url, req);
  proxy.headers.set("X-Proxy", "1");

  return req.headers.get("X-Proxy") ? new Response(description) : fetch(proxy);
});
