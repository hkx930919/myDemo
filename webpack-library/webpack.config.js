const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    'large-number': './src/index.js', // 非压缩版本
    'large-number.min': './src/index.js' // 压缩版本
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: 'largeNumber', // 指定库的全局变量
    libraryTarget: 'umd' // 打包成umd，支持AMD/CJS/ESM
  },
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader']
      }
    ]
  },
  optimization: {
    minimize: true, // 开启压缩
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/ // 对.min.js文件进行压缩
      })
    ]
  },
  plugins: [new CleanWebpackPlugin()]
}
