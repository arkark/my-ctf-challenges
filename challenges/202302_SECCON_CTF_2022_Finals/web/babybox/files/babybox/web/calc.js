const { Parser } = require("expr-eval");

const expr = process.argv[2].trim();
console.log(new Parser().evaluate(expr));
