import DOMPurify from "https://cdn.jsdelivr.net/npm/dompurify@3.1.6/+esm";

const elements = document.querySelectorAll("script[type='application/json']");

for (const elm of elements) {
  const { title, content } = JSON.parse(elm.textContent);
  document.body.innerHTML += DOMPurify.sanitize(
    `
      <div class="nes-container is-dark with-title">
        <p id="title" class="title">${title}</p>
        <p id="content">${content}</p>
      </div>
    `.trim()
  );
}
