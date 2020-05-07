const path = require('path')
const fs = require('fs')
const PATH_SRC = path.join(__dirname, '../src')
const BLACK_LIST = ['base', '__base']
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isStartMode = global.mode === 'start'

const getEntryAndHtmlPluginWithMultiPage = () => {
  const entry = {}
  const HtmlWebpackPlugins = []
  const files = fs.readdirSync(PATH_SRC)
  const dirs = files.filter(file => {
    return (
      fs.statSync(path.join(PATH_SRC, file)).isDirectory() &&
      !BLACK_LIST.includes(file)
    )
  })
  console.log(dirs)
  dirs.forEach(f => {
    entry[`${f}/index`] = path.join(PATH_SRC, f)
    HtmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        filename: `${f}/index.html?[contenthash:8]`,
        template: path.join(PATH_SRC, f, 'index.html'),
        chunks: [`${f}/index`],
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        }
      })
    )
  })
  const data = {
    entry,
    HtmlWebpackPlugins
  }
  return data
}
/**
 * @func 辅助css生成，开发环境补齐style-loader,生产环境补齐MiniCssExtractPlugin.loader
 * @return loaders
 */
const generateCssLoader = function({ include, exclude, loaders, test }) {
  loaders = Array.isArray(loaders) ? loaders : [loaders]
  test = test || /\.css$/
  return {
    test,
    include,
    exclude,
    use: isStartMode
      ? ['style-loader', ...loaders]
      : [
          {
            loader: MiniCssExtractPlugin.loader
          },
          ...loaders
        ]
  }
}
module.exports = { getEntryAndHtmlPluginWithMultiPage, generateCssLoader }
