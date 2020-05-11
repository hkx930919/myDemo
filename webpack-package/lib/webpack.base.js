const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const {
  getEntryAndHtmlPluginWithMultiPage,
  generateCssLoader
} = require('./util')

const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const { projectRoot } = require('./constant')
const { entry, HtmlWebpackPlugins } = getEntryAndHtmlPluginWithMultiPage()
module.exports = {
  entry,
  output: {
    filename: '[name].js?[contenthash]',
    path: path.join(projectRoot, './dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(projectRoot, './src/'),
        loaders: ['babel-loader']
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'eslint-loader',
        options: {
          cache: true
        },
        enforce: 'pre',
        include: path.join(projectRoot, './src/')
      },
      generateCssLoader({
        include: path.join(projectRoot, './src/'),
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
          'postcss-loader'
        ]
      }),
      generateCssLoader({
        include: path.join(projectRoot, './src/'),
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
          'postcss-loader'
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
  stats: 'errors-only',
  plugins: [
    ...HtmlWebpackPlugins,
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      // 'process.env': baseEnv,
      'process.env.BUILD_ENV': JSON.stringify(process.env.BUILD_ENV)
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          //   entry: 'umd/react.production.min.js',
          // entry: 'umd/react.production.min.js',
          entry:
            'https://cdn.bootcdn.net/ajax/libs/react/16.13.1/umd/react.development.js',
          global: 'React'
          //   supplements:[], // 其他需要引入的文件
          //   append:true, //默认在所有chunks之前引入，加入append后，会在chunks后引入
        },
        {
          module: 'react-dom',
          entry:
            'https://cdn.bootcdn.net/ajax/libs/react-dom/16.13.1/umd/react-dom.development.js',
          //   entry: 'umd/react-dom.production.min.js',
          // entry: 'umd/react-dom.production.min.js',
          global: 'ReactDOM'
        }
      ],
      enabled: process.env.NODE_ENV === 'production'
      //   outputPath: 'thirdparty' // 打包后的文件默认是放在vendor文件夹，修改后放在thirdparty文件夹
      //   publicPath: '../' //默认是webpack.output.publicPath，
      //   cwpOptions: {
      //     context: path.resolve(__dirname, 'bower_components')
      //   }
    }),
    new FriendlyErrorsWebpackPlugin()
  ]
}
