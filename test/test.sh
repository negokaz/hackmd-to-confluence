#!/bin/bash

cd $(dirname $0)

function main {
  diff --side-by-side --width=250 --color <(test) <(expect) && echo === OK === || echo === NG ===
}

function test {
  cat source.md | node ../src/js/cli.js
}

function expect {
  cat expect.xml
}

main $@
