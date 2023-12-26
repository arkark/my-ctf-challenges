from flask import Flask, request, render_template

app = Flask(__name__)


@app.get("/")
def leakable():
    flag = request.cookies.get("FLAG", "SECCON{dummy}")[:18]
    return render_template("index.html", flag=flag)
