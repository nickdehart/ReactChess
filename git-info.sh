VERSION=`cat package.json \
    | grep version \
    | head -1 \
    | awk -F: '{ print $2 }' \
    | sed 's/[",]//g' \
    | tr -d '[[:space:]]'`

REVISION=`git rev-parse --short HEAD`
BRANCH=`git rev-parse --abbrev-ref HEAD`

VITE_GIT_INFO="$BRANCH-v$VERSION-$REVISION"
export VITE_GIT_INFO
set VITE_GIT_INFO="$BRANCH-v$VERSION-$REVISION"
echo $VITE_GIT_INFO
