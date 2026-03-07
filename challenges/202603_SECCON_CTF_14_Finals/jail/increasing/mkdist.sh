#!/bin/bash
set -eu

CHALLENGE=increasing

if [ -d distfiles ]; then
    rm -r distfiles
fi
mkdir distfiles
cp -r challenge "distfiles/$CHALLENGE"

pushd distfiles
    echo "SECCON{REDACTED}" > "$CHALLENGE/flag.txt"
    tar zcvf "$CHALLENGE.tar.gz" "$CHALLENGE"
popd
