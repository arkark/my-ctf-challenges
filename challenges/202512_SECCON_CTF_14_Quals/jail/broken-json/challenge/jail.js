#!/usr/local/bin/node
import readline from "node:readline/promises";
import { jsonrepair } from "jsonrepair";

using rl = readline.createInterface({ input: process.stdin, output: process.stderr });
await rl.question("jail> ").then(jsonrepair).then(eval).then(console.log);
