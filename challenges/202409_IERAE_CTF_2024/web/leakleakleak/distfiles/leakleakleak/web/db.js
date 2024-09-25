import crypto from "node:crypto";

class User {
  #locals;

  constructor() {
    const id = crypto.randomBytes(16).toString("base64");
    const notes = [];
    this.#locals = {
      id,
      notes,
    };
  }
  get id() {
    return this.#locals.id;
  }
  createNote(note) {
    this.#locals.notes.unshift(note);
  }
  deleteNote(index) {
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
  createUser() {
    const user = new User();
    this.#users.set(user.id, user);
    return user;
  }
  getUser(id) {
    return this.#users.get(id);
  }
}

export default new Db();
