const webpackBaseConfig = require('./webpack.base')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack')
const cssnano = require('cssnano')
const { speedMeatureWebpack } = require('./util')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob')
const path = require('path')

const PATH_SRC = path.join(__dirname, '../src')
const csspath = glob.sync(`${PATH_SRC}/**`, { nodir: true })
console.log('--csspath', csspath)

module.exports = speedMeatureWebpack(
  merge(webpackBaseConfig, {
    output: {
      publicPath: '../',
      chunkFilename: `[name].js?[contenthash]`
    },
    mode: 'production',
    plugins: [
      new webpack.HashedModuleIdsPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[name].[contenthash].css'
      }),
      new PurgecssPlugin({
        paths: glob.sync(`${PATH_SRC}/**/*`, { nodir: true }),
        whitelistPatterns: (...args) => {
          console.log('args', args)

          return [/^purify-/]
        }
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

      // new BundleAnalyzerPlugin()
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
  }),
  false
)
