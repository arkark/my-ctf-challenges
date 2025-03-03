#!/bin/bash
set -eu

CHALLENGE=purexss

if [ -d distfiles ]; then
    rm -r distfiles
fi
mkdir distfiles
cp -r build "distfiles/$CHALLENGE"

pushd distfiles
    find . -maxdepth 3 -type d -name node_modules | xargs --no-run-if-empty rm -r
    sed -i -E 's/SECCON\{.+\}/SECCON\{dummy\}/g' "$CHALLENGE/compose.yaml"
    tar zcvf "$CHALLENGE.tar.gz" "$CHALLENGE"
popd
