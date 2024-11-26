"use strict";
const vm = require("node:vm");

const { globalThis: 𝓰𝓵𝓸𝓫𝓪𝓵𝓣𝓱𝓲𝓼, process: 𝓹𝓻𝓸𝓬𝓮𝓼𝓼 } = globalThis;

const code = `String(${process.argv[2].trim()})`;
const context = vm.createContext(undefined, {
  codeGeneration: {
    strings: false,
    wasm: false,
  },
});

// You cannot access anything...
for (const key in Object.getOwnPropertyDescriptors(𝓰𝓵𝓸𝓫𝓪𝓵𝓣𝓱𝓲𝓼)) {
  try {
    delete 𝓰𝓵𝓸𝓫𝓪𝓵𝓣𝓱𝓲𝓼[key];
  } catch {}
}

// Can you get RCE?
const res = vm.runInContext(code, context);
𝓹𝓻𝓸𝓬𝓮𝓼𝓼.stdout.write(typeof res === "string" ? res : ":(");
