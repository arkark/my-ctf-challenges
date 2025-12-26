#!/usr/local/bin/python3
ex = None
while (code := input("jail> ")) and all(code.count(c) <= 1 for c in ".,(+)"):
    try:
        eval(code, {"__builtins__": {}, "ex": ex})
    except Exception as e:
        ex = e
