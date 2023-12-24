#!/bin/bash
set -eu

CHALLENGE=lemonmd

if [ -d files ]; then
    rm -r files
fi

mkdir files
cp -r build "files/$CHALLENGE"
find files -maxdepth 4 -type d -name node_modules | xargs --no-run-if-empty rm -r

sed -i -E 's/SECCON\{.+\}/SECCON\{dummy\}/g' "files/$CHALLENGE/docker-compose.yml"
