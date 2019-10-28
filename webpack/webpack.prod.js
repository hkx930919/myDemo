const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(common,{
    devtool:'source-map',
    plugins:[new UglifyjsWebpackPlugin({sourceMap: true})]
})