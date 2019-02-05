#!/usr/bin/env node
const interpolate = require('interpolate')
const opts = require('yargs')
  .option('template', {
    alias: 't',
    describe: 'Interpolate meta values into a string, e.g. "event:{name}"'
  })
  .argv

const meta = require('./src')
const values = Object.assign({}, meta, opts)

if (opts.template) {
  console.log(interpolate(opts.template, values))
} else {
  for (const arg of opts._) {
    console.log(interpolate(arg, values))
  }
}
