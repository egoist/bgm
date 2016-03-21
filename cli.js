#!/usr/bin/env node
'use strict'
const meow = require('meow')
const main = require('./')

const cli = meow(`
  Usage:

    bgm [season]

    -v/--version    Print version
    -h/--help       Print help
`, {
  alias: {
    w: 'weekday',
    d: 'date',
    h: 'help',
    v: 'version'
  },
  string: ['weekday']
})

main(cli)
