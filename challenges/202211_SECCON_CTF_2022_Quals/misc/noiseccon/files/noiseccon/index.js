const { noise } = require("./perlin.js");
const sharp = require("sharp");
const crypto = require("node:crypto");
const readline = require("node:readline").promises;

const FLAG = process.env.FLAG ?? console.log("No flag") ?? process.exit(1);
const WIDTH = 256;
const HEIGHT = 256;

console.log(
  `   _   _       _             ____                           _
  | \\ | | ___ (_)___  ___   / ___| ___ _ __   ___ _ __ __ _| |_ ___  _ __
  |  \\| |/ _ \\| / __|/ _ \\ | |  _ / _ \\ '_ \\ / _ \\ '__/ _\` | __/ _ \\| '__|
  | |\\  | (_) | \\__ \\  __/ | |_| |  __/ | | |  __/ | | (_| | || (_) | |
  |_| \\_|\\___/|_|___/\\___|  \\____|\\___|_| |_|\\___|_|  \\__,_|\\__\\___/|_|
  `
);

console.log(`Flag length: ${FLAG.length}`);
console.log(`Image width: ${WIDTH}`);
console.log(`Image height: ${HEIGHT}`);

const paddedFlag = [
  ...crypto.randomBytes(8), // random prefix
  ...Buffer.from(FLAG),
  ...crypto.randomBytes(8), // random suffix
];

// bytes_to_long
let flagInt = 0n;
for (const b of Buffer.from(paddedFlag)) {
  flagInt = (flagInt << 8n) | BigInt(b);
}

const generateNoise = async (scaleX, scaleY) => {
  const div = (x, y) => {
    const p = 4;
    return Number(BigInt.asUintN(32 + p, (x * BigInt(1 << p)) / y)) / (1 << p);
  };

  const offsetX = div(flagInt, scaleX);
  const offsetY = div(flagInt, scaleY);

  noise.seed(crypto.randomInt(65536));
  const colors = [];
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let v = noise.perlin2(offsetX + x * 0.05, offsetY + y * 0.05);
      v = (v + 1.0) * 0.5; // [-1, 1] -> [0, 1]
      colors.push((v * 256) | 0);
    }
  }

  const image = await sharp(Uint8Array.from(colors), {
    raw: {
      width: WIDTH,
      height: HEIGHT,
      channels: 1,
    },
  })
    .webp({ lossless: true })
    .toBuffer();
  return image;
};

const main = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  const toBigInt = (value) => {
    if (value.length > 100) {
      console.log(`Invalid value: ${value}`);
      process.exit(1);
    }
    const result = BigInt(value);
    if (result <= 0n) {
      console.log(`Invalid value: ${value}`);
      process.exit(1);
    }
    return result;
  };

  const query = async () => {
    const scaleX = toBigInt(await rl.question("Scale x: "));
    const scaleY = toBigInt(await rl.question("Scale y: "));

    const image = await generateNoise(scaleX, scaleY);
    console.log(image.toString("base64"));
  };
  await query();

  rl.close();
};

main();
