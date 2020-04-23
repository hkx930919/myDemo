const path = require('path')
const webpack = require('webpack')
const webpackBaseConfig = require('./webpack.base')
const merge = require('webpack-merge')
module.exports = merge(webpackBaseConfig, {
  module: {
    mode: 'development',
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                auto: true
              }
            }
          },
          'less-loader'
        ]
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
})
