const path = require('path')
module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: [path.resolve(__dirname, '../raw-loader/loader/index.js')]
      }
    ]
  }
}
