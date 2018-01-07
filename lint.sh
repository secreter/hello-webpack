#!/bin/bash 
 
# 确保将要提交的所有 JavaScript 代码通过 standard 规范的检查 
function xargs-r() {
  # Portable version of "xargs -r". The -r flag is a GNU extension that 
  # prevents xargs from running if there are no input files. 
  if IFS= read -r -d '' path; then
    { echo -n "$path"; echo -ne "\0"; cat; } | xargs $@
  fi
}
git diff -z --name-only --cached --relative | grep -z '\.jsx\?$' | xargs-r -0 -t standard
if [[ $? -ne 0 ]]; then
  echo 'JavaScript Standard Style errors were detected. Aborting commit.'
  exit 1
fi