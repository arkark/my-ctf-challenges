#!/bin/bash

set -eu

if [ -d files ]; then
    rm -r files
fi

mkdir -p files/dist

cp -r web files/dist/web
cp -r bot files/dist/bot
find files -maxdepth 3 -type d  -name node_modules | xargs --no-run-if-empty rm -r

sed -E 's/SECCON\{.+\}/SECCON\{dummydummy\}/g' docker-compose.yml > files/dist/docker-compose.yml
