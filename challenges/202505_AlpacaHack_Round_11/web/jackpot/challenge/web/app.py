from flask import Flask, request, render_template, jsonify
from werkzeug.exceptions import BadRequest, HTTPException
import os, re, random, json

app = Flask(__name__)
FLAG = os.getenv("FLAG", "Alpaca{dummy}")


def validate(value: str | None) -> list[int]:
    if value is None:
        raise BadRequest("Missing parameter")
    if not re.fullmatch(r"\d+", value):
        raise BadRequest("Not decimal digits")
    if len(value) < 10:
        raise BadRequest("Too little candidates")

    candidates = list(value)[:10]
    if len(candidates) != len(set(candidates)):
        raise BadRequest("Not unique")

    return [int(x) for x in candidates]


@app.get("/")
def index():
    return render_template("index.html")


@app.get("/slot")
def slot():
    candidates = validate(request.args.get("candidates"))

    num = 15
    results = random.choices(candidates, k=num)

    is_jackpot = results == [7] * num  # 777777777777777

    return jsonify(
        {
            "code": 200,
            "results": results,
            "isJackpot": is_jackpot,
            "flag": FLAG if is_jackpot else None,
        }
    )


@app.errorhandler(HTTPException)
def handle_exception(e):
    response = e.get_response()
    response.data = json.dumps({"code": e.code, "description": e.description})
    response.content_type = "application/json"
    return response


if __name__ == "__main__":
    app.run(debug=False, host="0.0.0.0", port=3000)
