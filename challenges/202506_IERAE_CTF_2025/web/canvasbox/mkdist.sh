#!/bin/bash
set -eu

CHALLENGE=canvasbox

if [ -d distfiles ]; then
    rm -r distfiles
fi

mkdir distfiles
cp -r challenge "distfiles/$CHALLENGE"

pushd distfiles
    find . -maxdepth 3 -type d -name node_modules | xargs --no-run-if-empty rm -r
    mv "$CHALLENGE/compose.local.yaml" "$CHALLENGE/compose.yaml"
    tar zcvf "$CHALLENGE.tar.gz" "$CHALLENGE"
popd
