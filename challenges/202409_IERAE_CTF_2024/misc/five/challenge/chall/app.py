from flask import Flask, request, session
from werkzeug.utils import secure_filename

import os
import secrets
import subprocess

app = Flask(__name__)
app.secret_key = secrets.token_hex(16)


@app.before_request
def hook():
    if "user_dir" not in session:
        session["user_dir"] = os.path.join("./sandbox", secrets.token_hex(16))
    os.makedirs(session["user_dir"], exist_ok=True)


@app.get("/")
def index():
    return """
<!DOCTYPE html>
<title>JS Sandbox</title>
<h3>Upload a JavaScript file</h3>
<form>
  <input type="file" name="file" accept=".js" required />
  <input type="submit" value="Upload" />
</form>
<script>
  const form = document.forms[0];
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    fetch("/run", {
      method: "POST",
      body: data,
    })
      .then((r) => r.text())
      .catch((e) => e)
      .then(alert);
  });
</script>
""".strip()


@app.post("/run")
def run():
    if "file" not in request.files:
        return "Missing file parameter", 400
    file = request.files["file"]
    filename = secure_filename(file.filename or "")

    # A new JSFxxk challenge!
    content = file.read().decode()
    if len(set(content)) > 5:
        return "Too many characters :(", 400

    filepath = os.path.join(session["user_dir"], filename)
    open(filepath, "w").write(content)

    try:
        proc = subprocess.run(
            ["bun", filepath],
            capture_output=True,
            timeout=2,
        )
        if proc.returncode == 0:
            return "Result: " + proc.stdout.decode()
        else:
            return "Error"
    except subprocess.TimeoutExpired:
        return "Timeout"
