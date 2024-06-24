#!/bin/sh -l
echo "Reading package.json from ./package.json"
PACKAGE_VERSION=$(cat ./package.json | jq '.version' | tr -d '"')

echo "current-version=${PACKAGE_VERSION}" >> $GITHUB_OUTPUT
