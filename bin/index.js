#!/usr/bin/env node

const { parseInput, getRates } = require('../lib')

const [, , ...args] = process.argv
const { quantity, base, currency } = parseInput(args)
const url = `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${currency}`

getRates(url)
  .then(rates => console.log(rates[currency] * quantity))
  .catch(err => console.error(err))
