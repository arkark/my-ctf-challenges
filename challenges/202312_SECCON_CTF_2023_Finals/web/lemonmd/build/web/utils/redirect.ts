const redirect = (url: string): Response =>
  new Response("", { status: 302, headers: { "Location": url } });

export default redirect;
