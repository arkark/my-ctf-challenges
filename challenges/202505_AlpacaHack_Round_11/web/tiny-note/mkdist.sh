#!/bin/bash
set -eu

CHALLENGE=tiny-note

if [ -d distfiles ]; then
    rm -r distfiles
fi

mkdir distfiles
cp -r challenge "distfiles/$CHALLENGE"

pushd distfiles
    echo "Alpaca{REDACTED}" > "$CHALLENGE/web/flag.txt"
    tar zcvf "$CHALLENGE.tar.gz" "$CHALLENGE"
popd
