#!/bin/bash
set -eu

if [ -d files ]; then
    rm -r files
fi

mkdir files
cp -r build files/crabox

sed -i -E 's/SECCON\{.+\}/SECCON\{dummy\}/g' files/crabox/docker-compose.yml
