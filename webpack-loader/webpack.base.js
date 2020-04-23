const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')
const getEntryAndHtmlPluginWithMultiPage = require('./getEntryAndHtmlPluginWithMultiPage')

const { entry, HtmlWebpackPlugins } = getEntryAndHtmlPluginWithMultiPage()
module.exports = {
  //   entry: {
  //     'index/index': './src/index/index.js',
  //     'search/index': './src/search/index.js'
  //   },
  //   entry: './src/index/index.js',
  entry,

  output: {
    filename: '[name].js?[contenthash]',
    path: path.join(__dirname, './dist'),
    chunkFilename: `[name].js?[contenthash]`
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
  plugins: [...HtmlWebpackPlugins, new CleanWebpackPlugin()]
}
