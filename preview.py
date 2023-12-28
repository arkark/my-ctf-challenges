import flask
import grip

app = grip.create_app()


@app.after_request
def hook(response: flask.Response) -> flask.Response:
    # Workaround for infinite redirects:
    #   e.g. `GET /challenges HTTP/1.1`
    #        -> 302 Found: `Location: /challenges`
    if response.status_code == 302:
        path = response.headers["Location"]
        if path == flask.request.path:
            assert not path.endswith("/")
            response.headers["Location"] += "/"

    return response
