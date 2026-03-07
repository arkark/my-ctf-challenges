#!/bin/bash
set -eu

CHALLENGE=slay-the-note

if [ -d distfiles ]; then
    rm -r distfiles
fi
mkdir distfiles
cp -r challenge "distfiles/$CHALLENGE"

pushd distfiles
    find "./$CHALLENGE" -maxdepth 3 -type d -name node_modules | xargs --no-run-if-empty rm -r
    sed -i -E 's/SECCON\{.+\}/SECCON\{REDACTED\}/g' "$CHALLENGE/compose.yaml"
    tar zcvf "$CHALLENGE.tar.gz" "$CHALLENGE"
popd
