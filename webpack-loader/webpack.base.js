const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')
module.exports = {
  entry: {
    app: './src/index/index.js',
    search: './src/search/index.js'
  },
  output: {
    filename: '[name]_[chunkhash:8].js',
    path: path.join(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240
            }
          }
        ]
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin(), new CleanWebpackPlugin()]
}
