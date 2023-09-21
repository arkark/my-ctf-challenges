const fastify = require("fastify")();
const fs = require("node:fs/promises");

const PORT = process.env.PORT ?? "3000";

fastify.register(require("@fastify/formbody"));
fastify.register(require("./report"), { prefix: "/report" });

fastify.get("/", async (req, reply) => {
  const html = await fs.readFile("views/index.html");
  return reply.type("text/html; charset=utf-8").send(html);
});

fastify.get("/result", async (req, reply) => {
  const html = await fs.readFile("views/result.html");
  return reply.type("text/html; charset=utf-8").send(html);
});

fastify.get("/api/emojis", async (req, reply) => {
  const emojis =
    "😀/😃/😄/😁/😆/😅/😂/🤣/🥲/☺️/😊/😇/🙂/🙃/😉/😌/😍/🥰/😘/😗/😙/😚/😋/😛/😝/😜/🤪/🤨/🧐/🤓/😎/🥸/🤩/🥳/😏/😒/😞/😔/😟/😕/🙁/☹️/😣/😖/😫/😩/🥺/😢/😭/😤/😠/😡/🤬/🤯/😳/🥵/🥶/😱/😨/😰/😥/😓/🤗/🤔/🤭/🤫/🤥/😶/😐/😑/😬/🙄/😯/😦/😧/😮/😲/🥱/😴/🤤/😪/😵/🤐/🥴/🤢/🤮/🤧/😷/🤒/🤕/🤑/🤠/😈/👿/👹/👺/🤡/💩/👻/💀/☠️/👽/👾/🤖/🎃/😺/😸/😹/😻/😼/😽/🙀/😿/😾/🐶/🐱/🐭/🐹/🐰/🦊/🐻/🐼/🐻‍❄️/🐨/🐯/🦁/🐮/🐷/🐽/🐸/🐵/🙈/🙉/🙊/🐒/🐔/🐧/🐦/🐤/🐣/🐥/🦆/🦅/🦉/🦇/🐺/🐗/🐴/🦄/🐝/🪱/🐛/🦋/🐌/🐞/🐜/🪰/🪲/🪳/🦟/🦗/🕷/🕸/🦂/🐢/🐍/🦎/🦖/🦕/🐙/🦑/🦐/🦞/🦀/🐡/🐠/🐟/🐬/🐳/🐋/🦈/🐊/🐅/🐆/🦓/🦍/🦧/🦣/🐘/🦛/🦏/🐪/🐫/🦒/🦘/🦬/🐃/🐂/🐄/🐎/🐖/🐏/🐑/🦙/🐐/🦌/🐕/🐩/🦮/🐕‍🦺/🐈/🐈‍⬛/🪶/🐓/🦃/🦤/🦚/🦜/🦢/🦩/🕊/🐇/🦝/🦨/🦡/🦫/🦦/🦥/🐁/🐀/🐿/🦔/🐾/🐉/🐲".split(
      "/"
    );
  return reply.send(emojis);
});

fastify.listen({ port: PORT, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening at "${address}"`);
});
