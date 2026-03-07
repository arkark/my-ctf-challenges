import socket, select, threading

LISTEN = ("0.0.0.0", 3000)
UPSTREAM = ("backend", 3000)


def waf(req: str) -> bool:
    return (
        # Path traversal?
        ".." in req
        or
        # Transfer-Encoding?
        "transfer" in req.lower()
    )


def proxy(client: socket.socket, upstream: socket.socket):
    rlist = [client, upstream]
    for conn in rlist:
        conn.settimeout(0.2)

    req = b""
    while rlist:
        r, _, _ = select.select(rlist, [], [], 10)
        if not r:
            break
        for src in r:
            dst = [client, upstream][src is client]

            data = b""
            while True:
                try:
                    data += src.recv(65536)
                except (BlockingIOError, TimeoutError) as e:
                    break
            if not data:
                dst.shutdown(socket.SHUT_WR)
                rlist.clear()
                break

            if src is client:
                req += data
                if waf(req.decode()):
                    client.sendall(
                        b"HTTP/1.1 403 Forbidden\r\n"
                        b"Content-Type: text/plain\r\n"
                        b"Content-Length: 0\r\n"
                        b"Connection: close\r\n\r\n"
                    )
                    rlist.clear()
                    break

            dst.sendall(data)


def handle(client: socket.socket):
    try:
        upstream = socket.create_connection(UPSTREAM, timeout=10)
        proxy(client, upstream)
    finally:
        for conn in (client, upstream):
            try:
                conn.close()
            except:
                pass


def main():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        sock.bind(LISTEN)
        sock.listen(socket.SOMAXCONN)
        print(f"* forwarding {LISTEN} -> {UPSTREAM}")
        while True:
            client, _ = sock.accept()
            threading.Thread(target=handle, args=(client,), daemon=True).start()


if __name__ == "__main__":
    main()
