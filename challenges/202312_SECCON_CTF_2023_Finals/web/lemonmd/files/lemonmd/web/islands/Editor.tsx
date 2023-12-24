import type { Signal } from "@preact/signals";

interface EditorProps {
  text: Signal<string>;
}

export default function Editor(props: EditorProps) {
  return (
    <textarea
      name="text"
      value={props.text.value}
      onInput={(e) => {
        props.text.value = (e.target as HTMLTextAreaElement).value;
      }}
      rows={10}
    />
  );
}
