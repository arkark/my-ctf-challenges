#!/bin/bash

set -eu

if [ -d files ]; then
    rm -r files
fi

mkdir files

cp -r build files/denobox
find files -maxdepth 4 -type d -name target | xargs --no-run-if-empty rm -r

sed -i -E 's/SECCON\{.+\}/SECCON\{dummydummy\}/g' files/denobox/docker-compose.yml
