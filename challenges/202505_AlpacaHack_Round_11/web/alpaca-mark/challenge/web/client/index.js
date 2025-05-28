import "@picocss/pico";
import * as marked from "marked";

const markdown =
  localStorage.getItem("markdown") ??
  (await import("can-deparam").then(
    ({ default: deparam }) => deparam(location.search.slice(1)).markdown ?? ""
  ));
localStorage.setItem("markdown", markdown);

renderElm.addEventListener("submit", () => localStorage.removeItem("markdown"));

if (markdown) {
  const elm = document.createElement("article");
  elm.innerHTML = marked.parse(markdown).replaceAll(":alpaca:", "🦙");

  previewElm.appendChild(elm);
}

const textarea = document.querySelector("textarea[name=markdown]");
textarea.rows = textarea.value.split("\n").length + 1;
