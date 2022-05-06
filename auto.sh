#!/bin/bash

# pulll master
git pull origin master

# extract md from LoC
python3 ../scripts/ex_md.py

# insert date
sed -i "" "s/updated on.*\./updated on `date +'%B %d, %Y'`./" README.md

git add .
git commit -a -m "udpate md"
git push origin master

# install the plugins and build the static site
gitbook install && gitbook build

# checkout to the gh-pages branch
git checkout gh-pages

# pull the latest updates
git pull origin gh-pages

# copy the static site files into the current directory.
cp -R _book/* .

# remove 'node_modules' and '_book' directory
git clean -fx node_modules
git clean -fx _book

# add all files
git add .

# commit
git commit -a -m "Update docs"

# push to the origin
git push origin gh-pages

# checkout to the master branch
git checkout master
