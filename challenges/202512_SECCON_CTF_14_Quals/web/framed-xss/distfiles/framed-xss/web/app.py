from flask import Flask, request

app = Flask(__name__)


@app.get("/")
def index():
    return """
<body>
  <h1>XSS Challenge</h1>
  <form action="/">
    <textarea name="html" rows="4" cols="36"></textarea>
    <button type="submit">Render</button>
  <form>
  <script type="module">
    const html = await fetch("/view" + location.search, {
      headers: { "From-Fetch": "1" },
    }).then((r) => r.text());
    if (html) {
      document.forms[0].html.value = html;
      const iframe = document.createElement("iframe");
      iframe.setAttribute("sandbox", "");
      iframe.srcdoc = html;
      document.body.append(iframe);
    }
  </script>
</body>
    """.strip()


@app.get("/view")
def view():
    if not request.headers.get("From-Fetch", ""):
        return "Use fetch", 400
    return request.args.get("html", "")


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=3000)
