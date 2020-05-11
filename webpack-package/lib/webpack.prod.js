const webpackBaseConfig = require('./webpack.base')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack')
const cssnano = require('cssnano')

module.exports = merge(webpackBaseConfig, {
  output: {
    publicPath: '../',
    chunkFilename: '[name].js?[contenthash]'
  },
  mode: 'production',
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[contenthash].css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
      cssProcessorOptions: {
        discardComments: { removeAll: true },
        // 避免 cssnano 重新计算 z-index
        safe: true,
        autoprefixer: false
      }
    })
  ],
  optimization: {
    namedChunks: true,
    splitChunks: {
      cacheGroups: {
        common: {
          chunks: 'all',
          minChunks: 2,
          minSize: 0
        }
      }
    }
  }
})
