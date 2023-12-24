import type { Signal } from "@preact/signals";
import { render } from "$gfm";

interface PreviewProps {
  text: Signal<string>;
}

export default function Preview(props: PreviewProps) {
  return (
    <div
      class="markdown-body"
      dangerouslySetInnerHTML={{ __html: render(props.text.value) }}
    />
  );
}
