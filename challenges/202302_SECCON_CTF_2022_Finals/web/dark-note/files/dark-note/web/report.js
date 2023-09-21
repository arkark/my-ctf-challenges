const net = require("node:net");

const APP_PORT = process.env.APP_PORT ?? "3000";
const BASIC_USERNAME = process.env.BASIC_USERNAME;
const BASIC_PASSWORD = process.env.BASIC_PASSWORD;

const BOT_HOST = "bot";
const BOT_PORT = "8000";

const REPORT_DURATION = 30; // secs
const ipToLastTime = new Map(); // (ip: string) -> Time

const router = (fastify, _opts, done) => {
  fastify.post("/", async (req, reply) => {
    const { url } = req.body;
    if (url == null) {
      return reply.code(400).send("Url not found");
    }
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return reply.code(400).send("Bad protocol :(");
    }

    const ip = req.ip;
    const time = Date.now();
    if (ipToLastTime.has(ip)) {
      const diff = (time - ipToLastTime.get(ip)) / 1000; // secs
      const rest = Math.floor(REPORT_DURATION - diff);
      if (rest > 0) {
        return reply.code(400).send(`Please wait ${rest} secs`);
      }
    }
    ipToLastTime.set(ip, time);

    try {
      const client = net.connect(BOT_PORT, BOT_HOST, () => {
        client.write(
          `${APP_PORT}:${BASIC_USERNAME ?? ""}:${BASIC_PASSWORD ?? ""}:${url}`
        );
      });

      let response = "";
      client.on("data", (data) => {
        response += data.toString();
        client.end();
      });

      client.on("end", () => reply.send(response));
      return reply;
    } catch (e) {
      console.log(e);
      return reply.code(500).send("Something wrong...");
    }
  });

  done();
};

module.exports = router;
