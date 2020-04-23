const webpackBaseConfig = require('./webpack.base')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const cssnano = require('cssnano')
module.exports = merge(webpackBaseConfig, {
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
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css'
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
    splitChunks: {
      cacheGroups: {
        cssCommon: {
          chunks: 'all',
          minChunks: 2,
          test: module => {
            const iscss = /\.(c|le)ss$/.test(module.resource)

            console.log('===iscss', iscss)
            console.log('--module', module.resource)

            return iscss
          }
        }
      }
    }
  }
})
