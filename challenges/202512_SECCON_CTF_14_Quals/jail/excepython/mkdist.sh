#!/bin/bash
set -eu

CHALLENGE=excepython

if [ -d distfiles ]; then
    rm -r distfiles
fi
mkdir distfiles
cp -r challenge "distfiles/$CHALLENGE"

pushd distfiles
    find . -maxdepth 3 -type d -name node_modules | xargs --no-run-if-empty rm -r
    echo "SECCON{REDACTED}" > "$CHALLENGE/flag.txt"
    tar zcvf "$CHALLENGE.tar.gz" "$CHALLENGE"
popd
