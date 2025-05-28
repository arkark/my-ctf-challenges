#!/bin/bash
set -eu

CHALLENGE=jackpot

if [ -d distfiles ]; then
    rm -r distfiles
fi

mkdir distfiles
cp -r challenge "distfiles/$CHALLENGE"

pushd distfiles
    sed -i -E 's/Alpaca\{.+\}/Alpaca\{REDACTED\}/g' "$CHALLENGE/compose.yaml"
    tar zcvf "$CHALLENGE.tar.gz" "$CHALLENGE"
popd
