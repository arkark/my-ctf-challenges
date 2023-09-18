#!/bin/bash
set -eu

if [ -d files ]; then
    rm -r files
fi

mkdir files
cp -r build files/eeeeejs
find files/eeeeejs -maxdepth 3 -type d -name node_modules | xargs --no-run-if-empty rm -r
find files/eeeeejs -type f -name render.dist.js | xargs --no-run-if-empty rm

sed -i -E 's/SECCON\{.+\}/SECCON\{dummy\}/g' files/eeeeejs/docker-compose.yml
