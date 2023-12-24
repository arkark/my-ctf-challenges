class Db {
  #texts: Map<string, string>;

  constructor() {
    this.#texts = new Map();
  }

  save(text: string): string {
    const id = crypto.randomUUID();
    this.#texts.set(id, text);
    return id;
  }

  getById(id: string): string | undefined {
    return this.#texts.get(id);
  }
}

export default new Db();
