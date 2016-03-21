#!/usr/bin/env node
'use strict'
const meow = require('meow')
const main = require('./')

const cli = meow(`
  Usage:

    bgm

    -w/--weekday    Display by specific weekday
    -s/--season     Display by specific season
    -v/--version    Print version
    -h/--help       Print help
`, {
  alias: {
    w: 'weekday',
    s: 'season',
    h: 'help',
    v: 'version'
  },
  string: ['weekday']
})

main(cli)
