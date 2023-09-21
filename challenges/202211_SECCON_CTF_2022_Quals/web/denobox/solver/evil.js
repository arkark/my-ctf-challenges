export const crypto = {
  randomUUID: () => ({
    replaceAll: () => "dummy",
  }),
};

const proxy1 = new Proxy(
  {},
  {
    has(target, propertyKey) {
      console.log(propertyKey); // output a flag
      return Reflect.has(...arguments);
    },
  }
);

const proxy2 = new Proxy(
  {},
  {
    set(target, property, value, receiver) {
      Object.setPrototypeOf(value, proxy1);
      return Reflect.set(...arguments);
    },
  }
);

JSON.parse = () => proxy2;
