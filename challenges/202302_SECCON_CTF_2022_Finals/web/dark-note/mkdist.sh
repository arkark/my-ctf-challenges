#!/bin/bash

set -eu

if [ -d files ]; then
    rm -r files
fi
mkdir files

cp -r build files/dark-note
find files -maxdepth 4 -type d -name node_modules | xargs --no-run-if-empty rm -r

mv files/dark-note/docker-compose.local.yml files/dark-note/docker-compose.yml
