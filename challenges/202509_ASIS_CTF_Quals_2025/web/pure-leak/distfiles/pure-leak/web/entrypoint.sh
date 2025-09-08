#!/bin/sh
set -eu

# load balancing
php -S 127.0.0.1:9000 &
php -S 127.0.0.1:9001 &
php -S 127.0.0.1:9002 &
php -S 127.0.0.1:9003 &

cat > /tmp/Caddyfile << EOF
:3000 {
  header {
    defer
    Content-Security-Policy "script-src 'none'; default-src 'self'; base-uri 'none'"
  }

  reverse_proxy 127.0.0.1:9000 127.0.0.1:9001 127.0.0.1:9002 127.0.0.1:9003 {
    replace_status 200
  }
}
EOF

exec caddy run --config /tmp/Caddyfile
