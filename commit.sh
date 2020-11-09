#!/bin/bash

echo "What is the current lecture ?"

read lectureNum

git checkout -b lecture$lectureNum
git add .

echo "Please type in commit message "

read commitMessage

git commit -m "$commitMessage"
git push origin lecture$lectureNum