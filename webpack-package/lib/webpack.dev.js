global.mode = 'start'
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base')
const { projectRoot } = require('./constant')
module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  output: {
    filename: '[name].js',
    chunkFilename: '[id].js',
    publicPath: '/'
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: path.join(projectRoot, 'dist'),
    compress: true,
    port: 9000
  }
})
