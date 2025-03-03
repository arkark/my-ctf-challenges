#!/bin/bash
set -eu

if [ -d files ]; then
    rm -r files
fi
cp -r build files

pushd "files"
    echo "SECCON{dummy}" > flag.txt
popd


#!/bin/bash
set -eu

CHALLENGE=pp3

if [ -d distfiles ]; then
    rm -r distfiles
fi
mkdir distfiles
cp -r build "distfiles/$CHALLENGE"

pushd distfiles
    echo "SECCON{dummy}" > "$CHALLENGE/flag.txt"
    tar zcvf "$CHALLENGE.tar.gz" "$CHALLENGE"
popd
