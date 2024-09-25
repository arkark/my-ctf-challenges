#!/bin/bash
set -eu

CHALLENGE=leakleakleak

if [ -d distfiles ]; then
    rm -r distfiles
fi

mkdir distfiles
cp -r challenge "distfiles/$CHALLENGE"
find distfiles -maxdepth 4 -type d -name node_modules | xargs --no-run-if-empty rm -r

mv "distfiles/$CHALLENGE/compose.local.yaml" "distfiles/$CHALLENGE/compose.yaml"
