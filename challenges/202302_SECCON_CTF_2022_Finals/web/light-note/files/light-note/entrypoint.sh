#!/bin/bash
set -eu

cd /app/web
node index.js &

cd /app/bot
xvfb-run --auto-servernum node /app/bot/index.js
