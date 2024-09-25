#!/bin/bash
set -eu

CHALLENGE=simple-proxy

if [ -d files ]; then
    rm -r files
fi

mkdir files
cp -r build files/$CHALLENGE
pushd files
    sed -i -E 's/APP_HOST=.+/APP_HOST=localhost:3000/g' $CHALLENGE/compose.yaml
    sed -i -E 's/APP_HOST=.+/APP_HOST=localhost:3000/g' $CHALLENGE/compose.yaml
    mv $CHALLENGE/compose.local.yaml $CHALLENGE/compose.yaml
    echo "IERAE{dummy}" > $CHALLENGE/web/flag.txt
    rm $CHALLENGE/.env
popd
