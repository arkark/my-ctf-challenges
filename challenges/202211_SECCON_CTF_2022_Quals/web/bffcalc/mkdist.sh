#!/bin/bash

set -eu

if [ -d files ]; then
    rm -r files
fi

mkdir files

cp -r build files/bffcalc
find files -maxdepth 4 -type d -name node_modules | xargs --no-run-if-empty rm -r
find files -maxdepth 4 -type d -name __pycache__ | xargs --no-run-if-empty rm -r

sed -i -E 's/SECCON\{.+\}/SECCON\{dummydummy\}/g' files/bffcalc/docker-compose.yml
