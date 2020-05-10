global.mode = 'start'
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base')
const { speedMeatureWebpack } = require('./util')
module.exports = speedMeatureWebpack(
  merge(webpackBaseConfig, {
    mode: 'development',
    output: {
      filename: '[name].js',
      chunkFilename: '[id].js',
      publicPath: '/'
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000
    }
  })
)
