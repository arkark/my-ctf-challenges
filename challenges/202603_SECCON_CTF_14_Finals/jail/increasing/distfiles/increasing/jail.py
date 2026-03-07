code = input("code> ")[:130]

if not code.isascii():
    print("bye")
    exit(1)

max_len = 0
for m in __import__("re").finditer(r"\w+", code):
    if len(m[0]) <= max_len:
        print("bye")
        exit(1)
    max_len = len(m[0])

eval(code, {"__builtins__": {}})
