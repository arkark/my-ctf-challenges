#!/bin/bash
set -eu

if [ -d files ]; then
    rm -r files
fi

mkdir files
cp -r build files/node-ppjail
find files/node-ppjail -maxdepth 3 -type d -name node_modules | xargs --no-run-if-empty rm -r

echo SECCON{dummy} > files/node-ppjail/flag.txt
