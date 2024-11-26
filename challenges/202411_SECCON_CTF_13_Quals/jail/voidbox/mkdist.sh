#!/bin/bash
set -eu

if [ -d files ]; then
    rm -r files
fi
cp -r build files

pushd "files"
    find . -maxdepth 2 -type d -name node_modules | xargs --no-run-if-empty rm -r
    echo "SECCON{dummy}" > ./sandbox/flag.txt
popd
