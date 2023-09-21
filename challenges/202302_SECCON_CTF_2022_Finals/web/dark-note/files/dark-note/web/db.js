const crypto = require("node:crypto");
const Hogan = require("hogan.js");

const render = (text, context) => {
  const sanitized = text.replace(/[#\^<\$\/!>=&]/g, "");
  const rendered = Hogan.compile(sanitized).render(context);
  return rendered;
};

class User {
  #locals;

  constructor(name, password, emoji) {
    const id = crypto.randomBytes(32).toString("base64");

    const notes = new Proxy([], {
      get: (target, key, receiver) => {
        return typeof key === "string" && isFinite(key)
          ? render(target[key], this.#locals)
          : Reflect.get(target, key, receiver);
      },
    });

    this.#locals = {
      id,
      name,
      password,
      emoji,
      notes,
    };
  }

  get id() {
    return this.#locals.id;
  }

  get name() {
    return this.#locals.name;
  }

  get password() {
    return this.#locals.password;
  }

  changeEmoji(emoji) {
    this.#locals.emoji = emoji;
  }

  createNote(note) {
    this.#locals.notes.push(note);
  }

  deleteNote(index) {
    if (
      typeof index !== "number" ||
      Number.isNaN(index) ||
      index < 0 ||
      index >= this.#locals.notes.length
    ) {
      throw new Error("Failed to delete a note");
    }
    this.#locals.notes.splice(index, 1);
  }

  getNotes() {
    return this.#locals.notes;
  }
}

class Db {
  #users;

  constructor() {
    // (userId: number) -> User
    this.#users = new Map();
  }

  createUser(name, password, emoji) {
    if (this.getUserByName(name) != null) {
      throw new Error("Username already exists");
    }
    const user = new User(name, password, emoji);
    this.#users.set(user.id, user);
    return user;
  }

  getUser(id) {
    return this.#users.get(id);
  }

  getUserByName(userName) {
    for (const user of this.#users.values()) {
      if (user.name === userName) return user;
    }
    return null;
  }
}

module.exports = new Db();
