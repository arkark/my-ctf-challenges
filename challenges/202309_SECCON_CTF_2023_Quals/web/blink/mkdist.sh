#!/bin/bash
set -eu

if [ -d files ]; then
    rm -r files
fi

mkdir files
cp -r build files/blink
find files/blink -maxdepth 3 -type d -name node_modules | xargs --no-run-if-empty rm -r

sed -i -E 's/SECCON\{.+\}/SECCON\{dummy\}/g' files/blink/docker-compose.yml
