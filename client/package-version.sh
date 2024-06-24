#!/bin/sh -l
echo "Reading package.json from ./client/package.json"
PACKAGE_VERSION=$(cat ./client/package.json | jq '.version' | tr -d '"')

echo "current-version=${PACKAGE_VERSION}" >> $GITHUB_OUTPUT
