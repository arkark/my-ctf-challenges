#!/bin/bash
set -eu

if [ -d files ]; then
    rm -r files
fi

mkdir files
cp -r build files/hidden-note
find files/hidden-note -maxdepth 3 -type d -name node_modules | xargs --no-run-if-empty rm -r

sed -i -E 's/SECCON\{.+\}/SECCON\{dummy\}/g' files/hidden-note/docker-compose.yml
