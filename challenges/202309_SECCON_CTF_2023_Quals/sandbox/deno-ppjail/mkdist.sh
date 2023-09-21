#!/bin/bash
set -eu

if [ -d files ]; then
    rm -r files
fi

mkdir files
cp -r build files/deno-ppjail
find files/deno-ppjail -maxdepth 3 -type d -name .vscode | xargs --no-run-if-empty rm -r

echo SECCON{dummy} > files/deno-ppjail/flag.txt
