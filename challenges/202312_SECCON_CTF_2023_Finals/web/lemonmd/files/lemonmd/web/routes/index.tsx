import { useSignal } from "@preact/signals";
import Editor from "../islands/Editor.tsx";
import Preview from "../islands/Preview.tsx";

const defaultText = `
# Hi there 👋

**Lorem** ipsum dolor sit amet, consectetur adipiscing elit. Vivamus elementum nulla mauris. Maecenas diam mauris, malesuada et aliquet eu, consequat sit amet turpis. Donec elementum pellentesque neque, non gravida nulla vulputate vel. Mauris blandit aliquet mauris id laoreet. Nulla ultricies ac libero viverra pharetra. Proin et maximus diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis ac mattis eros. In hac habitasse platea dictumst. Mauris interdum ornare nulla vel sollicitudin.
`.trimStart();

export default function Index() {
  const text = useSignal(defaultText);

  return (
    <>
      <h1>🍋 LemonMD</h1>
      <form action="/save" method="post">
        <Editor text={text}></Editor>
        <details>
          <summary>Preview</summary>
          <Preview text={text}></Preview>
        </details>
        <div style="text-align:center;">
          <button type="submit">Save</button>
        </div>
      </form>
    </>
  );
}
