#!/bin/bash

cd $(dirname $0)

function main {
  diff -u <(expect) <(test) && echo === OK === || echo === NG ===
}

function test {
  cat source.md | node ../src/js/cli.js
}

function expect {
  cat expect.xml
}

main $@
