import type { Handlers, PageProps } from "$fresh/server.ts";
import { useSignal } from "@preact/signals";
import Preview from "../islands/Preview.tsx";
import db from "../utils/db.ts";
import redirect from "../utils/redirect.ts";

interface Data {
  text: string;
}

export const handler: Handlers = {
  async GET(_req, ctx) {
    const id = ctx.params.id;
    const text = db.getById(id);
    return text == null ? redirect("/") : await ctx.render({ text });
  },
};

export default function Page(props: PageProps<Data>) {
  const text = useSignal(props.data.text);
  return <Preview text={text}></Preview>;
}
