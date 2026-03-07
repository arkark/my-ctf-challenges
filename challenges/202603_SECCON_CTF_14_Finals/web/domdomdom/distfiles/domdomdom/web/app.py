from flask import Flask

app = Flask(__name__)


@app.get("/")
def index():
    return """
<body>
  <h1>XSS Challenge</h1>
  <form action="/" method="get">
    <input name="x" placeholder="{X}" required />
    <input name="y" placeholder="{Y}" required />
    <input name="z" placeholder="{Z}" required />
    <button type="submit">Go</button>
  </form>
  <main id="result" style="font-size: 2em; padding: 0.5em">{X}{Y}{Z}</main>
  <script
    src="https://cdn.jsdelivr.net/npm/dompurify@3.3.1/dist/purify.min.js"
    integrity="sha256-m0lAV/rWZW/ZziCJ0LaJjfljLBDkXkd1pDBzpGz/yMs="
    crossorigin="anonymous"
  ></script>
  <script>
    DOMPurify.addHook("afterSanitizeAttributes", (node) => {
      for (const { name, value } of node.attributes) {
        if (/[{}]/.test(value)) node.attributes.removeNamedItem(name);
      }
    });

    const [[, x], [, y], [, z]] = new URLSearchParams(location.search);
    if (x && y && z)
      result.innerHTML = "{X}{Y}{Z}"
        .replace("{X}", () => DOMPurify.sanitize(`<span>${x}</span>`))
        .replace("{Y}", () => DOMPurify.sanitize(`<span>${y}</span>`))
        .replace("{Z}", () => DOMPurify.sanitize(`<span>${z}</span>`));
  </script>
</body>
    """.strip()


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=3000)
