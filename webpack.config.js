require('babel-register')
const conf = require('./config').default

module.exports = require(`./build/webpack.${conf.envStrShort}`)
