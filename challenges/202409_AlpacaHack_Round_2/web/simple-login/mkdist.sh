#!/bin/bash
set -eu

if [ -d distfiles ]; then
    rm -r distfiles
fi
cp -r challenge distfiles

sed -i -E 's/Alpaca\{.+\}/Alpaca\{REDACTED\}/g' "distfiles/db/init.sql"
