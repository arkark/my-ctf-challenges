#!/usr/bin/python3
import sys
import subprocess
import tempfile

print(
    """
ʕ◔ϖ◔ʔ Go Language Jail Challenge ʕ◔ϖ◔ʔ

Input your program (the last line must start with __EOF__):
    """.strip(),
    flush=True,
)

# Input
code = ""
while True:
    line = sys.stdin.readline()
    if line.startswith("__EOF__"):
        break
    code += line

# Validation
if len(code) > 170:
    print("Too long code")
    exit(1)
if code.count("(") > 1:
    print("Don't use `(` except in `func main() { ... }`")
    exit(1)
if code.count("{") > 1:
    print("Don't use `{` except in `func main() { ... }`")
    exit(1)

# Run
with tempfile.TemporaryDirectory() as dirname:
    filename = "main.go"
    open(f"{dirname}/{filename}", "w").write(code)

    try:
        proc = subprocess.run(
            ["go", "run", filename],
            cwd=dirname,
            timeout=15,
            capture_output=True,
            env={
                "PATH": "/usr/local/go/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                "HOME": dirname,
            },
        )
        print(proc.stdout.decode() if proc.returncode == 0 else ":(")
        print("Executed")
    except subprocess.TimeoutExpired:
        print("Timeout")
    except Exception:
        print("Error")
