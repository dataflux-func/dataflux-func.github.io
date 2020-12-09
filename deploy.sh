#!/usr/bin/env sh

set -e

npm run build

cd docs
echo 'dataflux-func.pastgift-studio.com' > CNAME

cd -

git add -A
git commit -m 'deploy'
git push -f git@github.com:dataflux-func/dataflux-func.github.io.git master
