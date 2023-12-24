const WHITESPACE = " ";

const code = [...process.argv[2].trim()].join(WHITESPACE);
if (code.includes("(") || code.includes(")")) {
  console.log("Do not call functions :(");
  process.exit();
}

try {
  console.log(eval(code));
} catch {
  console.log("Error");
}
