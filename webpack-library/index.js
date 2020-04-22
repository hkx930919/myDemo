if (process.env.NODE_ENV === 'development') {
  module.exports = require('./dist/large-number.js')
} else {
  module.exports = require('./dist/large-number-min')
}
