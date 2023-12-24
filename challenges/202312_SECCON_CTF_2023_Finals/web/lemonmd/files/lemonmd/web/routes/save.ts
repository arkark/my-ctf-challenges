import type { Handlers } from "$fresh/server.ts";
import db from "../utils/db.ts";
import redirect from "../utils/redirect.ts";

export const handler: Handlers = {
  async POST(req, _ctx) {
    const text = (await req.formData()).get("text");
    if (typeof text !== "string") {
      return redirect("/");
    }
    const id = db.save(text);
    return redirect(`/${id}`);
  },
};
