#!/bin/bash
set -eu

if [ -d files ]; then
    rm -r files
fi
cp -r build files

pushd "files"
    find . -maxdepth 2 -type d -name node_modules | xargs --no-run-if-empty rm -r
    sed -i -E 's/SECCON\{.+\}/SECCON\{dummy\}/g' compose.yaml
popd
