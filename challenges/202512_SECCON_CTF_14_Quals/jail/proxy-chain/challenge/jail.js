const validate = (code) => {
  /*
    E.g.
      root()
      root.foo()
      root.foo.bar(root.baz())
      root.foo.bar(root.baz(root))
  */
  const pattern = /^root(\.\w+)*(\((?<recursive>.*)\))?$/;

  const found = code.match(pattern);
  if (!found) return false;

  const { recursive = "" } = found.groups;
  if (recursive.length === 0) return true;

  return validate(recursive);
};

const saved = new WeakMap();
const unwrap = (proxy) => (saved.has(proxy) ? unwrap(saved.get(proxy)) : proxy);

const wrap = (raw) => {
  if (raw === Function) process.exit(1); // banned!!!
  if (raw == null) return raw;

  const proxy = new Proxy(Object(raw), {
    get() {
      return wrap(Reflect.get(...arguments));
    },
    apply(target, thisArg, argArray) {
      return wrap(Reflect.apply(target, unwrap(thisArg), argArray.map(unwrap)));
    },
  });

  saved.set(proxy, raw);
  return proxy;
};

const code = process.argv[2].trim();
if (!validate(code)) {
  console.log("Invalid code");
  process.exit(1);
}

try {
  Function("root", code)(wrap([]));
} catch {}
