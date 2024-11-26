#!/bin/bash
set -eu

if [ -d files ]; then
    rm -r files
fi
cp -r build files

pushd "files"
    echo "SECCON{dummy}" > flag.txt
popd
