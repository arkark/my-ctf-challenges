import sys
import ast
import re
import tempfile
from importlib import util


def get_fn_name(source: str) -> str | None:
    root = ast.parse(source)
    if type(root) is not ast.Module:
        return None
    if len(root.body) != 1:
        return None

    fn = root.body[0]
    if type(fn) is not ast.FunctionDef:
        return None

    fn.body.clear()
    if not re.fullmatch(r"def \w+\((\w+(, \w+)*)?\):", ast.unparse(fn)):
        # You must define a function without decorators, type annotations, and so on.
        return None

    return str(fn.name)


print("""
Latexify as a Service!

E.g.
```
def solve(a, b, c):
    return (-b + math.sqrt(b**2 - 4*a*c)) / (2*a)
```
ref. https://github.com/google/latexify_py/blob/v0.1.1/examples/equation.ipynb

Input your function (the last line must start with __EOF__):
""".strip(), flush=True)

source = ""
while True:
    line = sys.stdin.readline()
    if line.startswith("__EOF__"):
        break
    source += line

name = get_fn_name(source)
if name is None:
    print("Invalid source")
    exit(1)

source += f"""
import latexify
__builtins__["print"](latexify.get_latex({name}))
"""

with tempfile.NamedTemporaryFile(suffix=".py") as file:
    file.write(source.encode())
    file.flush()

    print()
    print("Result:")
    spec = util.spec_from_file_location("tmp", file.name)
    spec.loader.exec_module(util.module_from_spec(spec))
