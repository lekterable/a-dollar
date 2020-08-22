const https = require('https')
const currencies = require('./currencies')

const isCurrency = currency => currencies.includes(currency.toUpperCase())

const parseInput = args => {
  if (!isNaN(args[0]) && isCurrency(args[1]) && isCurrency(args[2]))
    return {
      quantity: args[0],
      base: args[1].toUpperCase(),
      currency: args[2].toUpperCase()
    }
  throw new Error('Invalid arguments provided')
}

const getRates = url =>
  new Promise((resolve, reject) => {
    https
      .get(url, res => {
        let rates = ''
        res.on('data', data => {
          rates += data
        })
        res.on('end', () => {
          const response = JSON.parse(rates)
          if (!!response.error) reject(response.error)
          resolve(response.rates)
        })
      })
      .on('error', err => reject(err))
  })

module.exports = { isCurrency, parseInput, getRates }
