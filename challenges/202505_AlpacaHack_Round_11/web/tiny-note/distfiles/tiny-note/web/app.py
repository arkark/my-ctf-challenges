from flask import Flask, request, redirect, render_template
from flask_caching import Cache
from werkzeug.exceptions import BadRequest
import pathlib, uuid, shutil, urllib.parse

app = Flask(__name__)
app.config["CACHE_TYPE"] = "FileSystemCache"
app.config["CACHE_DIR"] = "/tmp/cache"
cache = Cache(app)
cache.clear()
shutil.rmtree("./notes", ignore_errors=True)


def validate(label: str, text: str | None, limit: tuple[int, int]) -> str:
    if text is None:
        raise BadRequest(f"{label}: Missing parameter")
    if len(text) < limit[0]:
        raise BadRequest(f"{label}: Too short")
    if len(text) > limit[1]:
        raise BadRequest(f"{label}: Too long")
    if ".." in text:
        raise BadRequest(f"{label}: Path traversal?")
    return text


@app.get("/")
def index():
    return render_template("index.html")


@app.post("/new")
def create_note():
    title = validate("title", request.form.get("title"), (1, 64))
    content = validate("content", request.form.get("content"), (1, 24))  # very short :)

    slug = pathlib.Path(str(uuid.uuid4())) / urllib.parse.quote(title)
    path = "./notes" / slug
    path.parent.mkdir(parents=True, exist_ok=True)
    open(path, mode="w").write(content)

    return redirect(f"/{slug}")


@app.get("/<uuid:id>/<string:title>")
@cache.cached(timeout=5, query_string=True)
def get_note(id: uuid.UUID, title: str):
    title = validate("title", title, (1, 64))
    path = pathlib.Path("./notes") / str(id) / urllib.parse.quote(title)
    content = open(path).read()
    if "Alpaca" in content:
        content = "REDACTED"
    return render_template("note.html", title=title, content=content)


if __name__ == "__main__":
    app.run(debug=False, host="0.0.0.0", port=3000)
