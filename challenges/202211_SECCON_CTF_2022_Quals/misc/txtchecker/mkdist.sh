#!/bin/bash

set -eu

if [ -d files ]; then
    rm -r files
fi

mkdir files

cp -r build files/txtchecker

sed -i -E 's/SECCON\{.+\}/SECCON\{dummy\}/g' files/txtchecker/flag.txt
