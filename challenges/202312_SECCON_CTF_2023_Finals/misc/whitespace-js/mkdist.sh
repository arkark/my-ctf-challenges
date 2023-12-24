#!/bin/bash
set -eu

CHALLENGE=whitespace-js

if [ -d files ]; then
    rm -r files
fi

mkdir files
cp -r build "files/$CHALLENGE"
find files -maxdepth 4 -type d -name node_modules | xargs --no-run-if-empty rm -r

echo "SECCON{dummy}" > "files/$CHALLENGE/sandbox/flag.txt"
