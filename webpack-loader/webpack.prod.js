const webpackBaseConfig = require('./webpack.base')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const webpack = require('webpack')
const cssnano = require('cssnano')
module.exports = merge(webpackBaseConfig, {
  output: {
    publicPath: '../'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
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
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: './[name].[contenthash].css'
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
      //   cacheGroups: {
      //     cssCommon: {
      //       chunks: 'all',
      //       minChunks: 2,
      //       test: module => {
      //         const iscss = /\.(c|le)ss$/.test(module.resource)
      //         console.log('===iscss', iscss)
      //         console.log('--module', module.resource)
      //         return iscss
      //       },
      //       minSize: 0
      //     },
      //     common: {
      //       chunks: 'all',
      //       minChunks: 2,
      //       minSize: 0,
      //       test: /util.js$/
      //       //   name: 'util'
      //     }
      //   }
    }
  }
})
