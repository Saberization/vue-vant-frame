const config = require('./build')
const options = process.env.NODE_ENV === 'production'
  ? config.build : config.dev

module.exports = options