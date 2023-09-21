#!/bin/bash

set -eu

if [ -d files ]; then
    rm -r files
fi

mkdir files

cp -r build files/noiseccon
find files -maxdepth 4 -type d -name node_modules | xargs --no-run-if-empty rm -r

sed -i -E 's/SECCON\{.+\}/SECCON\{dummy\}/g' files/noiseccon/docker-compose.yml
