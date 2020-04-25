const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const {
  getEntryAndHtmlPluginWithMultiPage,
  generateCssLoader
} = require('./util')

const baseEnv = require(`./config/${process.env.BUILD_ENV}.env`)

const { entry, HtmlWebpackPlugins } = getEntryAndHtmlPluginWithMultiPage()
module.exports = {
  entry,
  output: {
    filename: '[name].js?[contenthash]',
    path: path.join(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      generateCssLoader({
        include: path.join(__dirname, './src/'),
        test: /\.less$/,
        loaders: [
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                auto: true
              }
            }
          },
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')]
            }
          }
        ]
      }),
      generateCssLoader({
        include: path.join(__dirname, './src/'),
        test: /\.css$/,
        loaders: [
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                auto: true
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')]
            }
          }
        ]
      }),
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
  plugins: [
    ...HtmlWebpackPlugins,
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': baseEnv,
      'process.env.BUILD_ENV': JSON.stringify(process.env.BUILD_ENV)
    })
  ]
}
