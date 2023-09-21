#!/bin/bash
set -eu

if [ -d files ]; then
    rm -r files
fi
mkdir files

cp -r build files/light-note
find files -maxdepth 4 -type d -name node_modules | xargs --no-run-if-empty rm -r

mv files/light-note/docker-compose.local.yml files/light-note/docker-compose.yml
