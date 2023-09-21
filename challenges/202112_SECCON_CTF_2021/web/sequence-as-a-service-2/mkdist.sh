#!/bin/bash

set -eu

if [ -d files ]; then
    rm -r files
fi

mkdir -p files/dist

cp -r web files/dist/web
find files -maxdepth 4 -type d  -name node_modules | xargs --no-run-if-empty rm -r

cp docker-compose.yml files/dist/docker-compose.yml
echo "SECCON{dummydummy}" > files/dist/web/flag.txt
