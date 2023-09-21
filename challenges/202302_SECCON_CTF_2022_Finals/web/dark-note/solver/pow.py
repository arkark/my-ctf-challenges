import subprocess
import os
import pwn
import time

io = pwn.remote(os.getenv("SECCON_HOST"), os.getenv("SECCON_PORT"))

command = io.recvline().decode().strip()

print("Start: PoW")
proc = subprocess.run(command, shell=True, capture_output=True)
assert proc.returncode == 0

token = proc.stdout.strip()
io.sendlineafter(b"hashcash token: ", token)

io.recvuntil(b"URL (global): ")
SECCON_APP_PORT = io.recvline().decode().strip().split(":")[-1]

io.recvuntil(b"Username: ")
BASIC_USERNAME = io.recvline().decode().strip()
io.recvuntil(b"Password: ")
BASIC_PASSWORD = io.recvline().decode().strip()

env = {
    **os.environ,
    "SECCON_APP_PORT": SECCON_APP_PORT,
    "BASIC_USERNAME": BASIC_USERNAME,
    "BASIC_PASSWORD": BASIC_PASSWORD,
}
print(env)
print("End: PoW")

time.sleep(5)

print("Start: exploit")
proc = subprocess.run(
    ["node", "index.js"],
    env=env,
)
assert proc.returncode == 0
print("End: exploit")

io.close()
