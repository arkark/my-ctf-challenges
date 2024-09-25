#!/bin/bash
set -eu

CHALLENGE=five

if [ -d distfiles ]; then
    rm -r distfiles
fi

mkdir distfiles
cp -r challenge "distfiles/$CHALLENGE"

echo "IERAE{dummy}" > "distfiles/$CHALLENGE/chall/flag.txt"
mv "distfiles/$CHALLENGE/compose.local.yaml" "distfiles/$CHALLENGE/compose.yaml"
