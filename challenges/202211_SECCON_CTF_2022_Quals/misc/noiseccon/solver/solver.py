from concurrent.futures import ThreadPoolExecutor
from Crypto.Util.number import long_to_bytes, bytes_to_long
from PIL import Image
import pwn
from io import BytesIO
import base64
import os

LATTICE_SIZE = 20  # = 1 / 0.05

with pwn.remote(os.getenv('SECCON_HOST'), os.getenv('SECCON_PORT')) as io:
    io.recvuntil(b"Flag length: ")
    flag_bit_len = int(io.recvline().decode())*8
    io.recvuntil(b"Image width: ")
    width = int(io.recvline().decode())
    io.recvuntil(b"Image height: ")
    height = int(io.recvline().decode())


def get_image(scale_x, scale_y) -> Image:
    io = pwn.remote(os.getenv('SECCON_HOST'), os.getenv('SECCON_PORT'))
    io.sendlineafter(b"Scale x: ", str(scale_x).encode())
    io.sendlineafter(b"Scale y: ", str(scale_y).encode())
    binary = base64.b64decode(io.recvline().strip().decode())
    io.close()
    return Image.open(BytesIO(binary), formats=["webp"])


def oracle(bit_index: int) -> bool:
    scale_x = 2**(bit_index + 1)
    scale_y = 1

    for _ in range(10):
        img = get_image(scale_x, scale_y)
        # img.save("output.webp")
        data = list(img.getdata())
        assert len(data) == width*height

        voting = 0
        for y in range(0, height, LATTICE_SIZE):
            cnt = 0
            for x in range(width):
                color = data[y*width + x][0]
                if abs(color - 128) == 0:
                    cnt += 1
                else:
                    if 0 <= cnt - LATTICE_SIZE < 2:
                        i = (x - cnt - 2) % LATTICE_SIZE
                        voting += 1 if i < LATTICE_SIZE/2 else -1
                    cnt = 0
        if voting > 0:
            return True
        elif voting < 0:
            return False
        else:
            # Retry
            pass
    print("Failed")
    exit(1)


padded_bit_len = 8*8

flag = 0
with ThreadPoolExecutor(max_workers=8) as executor:
    bits = executor.map(oracle, range(padded_bit_len, padded_bit_len + flag_bit_len))
for index, bit in enumerate(bits):
    flag |= bit << index

print(long_to_bytes(flag))
