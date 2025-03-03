/*
Object.prototype.circular = {}
Object.prototype.circular.get = Function;
Function.prototype.toString = Function.prototype.call;
console.log(["console.log(123)"]);

// ref. https://github.com/nodejs/node/blob/v22.14.0/lib/internal/util/inspect.js#L1115-L1118
*/

Object.prototype[""] = "constructor";
// [][[]] === "constructor";
// [][[][[]]] === Array;
// [][[][[]]][[][[]]] === Function;

Object.prototype["function Function() { [native code] }"] = "__proto__";
// [][Function] === "__proto__";

Object.prototype["function Array() { [native code] }"] = "toString";
// [][[][[][[]]]] === "toString";

Object.prototype["false"] = "get";
// [][[]==[]] === "get";

Object.prototype["true"] = "circular";
// [][[]==[]==[]] === "circular";

Object.prototype["get"] = "call";
// [][[][[]==[]]] === "call";

Function.prototype[""] = "console.log(123)";
// [][[][[]]][[]] === "console.log(123)";

Object.prototype["circular"] = {};

// ---------------------------------------------------------------------

// // [].circular.get = Function;
// [][[][[]==[]==[]]][[][[]==[]]] = [][[][[]]][[][[]]];

// // Function.prototype.toString = Function.prototype.call;
// // Array.__proto__.toString = Array.call;
// // [][[][[]]][[][[][[][[]]]]][[][[][[][[]]]]] = [][[][[]]][[][[][[]==[]]]];
// [][[][[]]][[][/* [].circular.get = */Function]][[][[][[][[]]]]] = [][[][[]]][[][[][[]==[]]]];

// // console.log(["console.log(123)"]);
// console.log([[][[][[]]][[]]]);

// ---------------------------------------------------------------------s

console.log(
  [[[][[][[]]][[][[][[][[]==[]==[]]][[][[]==[]]]=[][[][[]]][[][[]]]]][[][[][[][[]]]]]=[][[][[]]][[][[][[]==[]]]]][[][[]]][[]]]
);
