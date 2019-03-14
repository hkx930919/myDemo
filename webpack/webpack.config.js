const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
module.exports = {
    // mode: 'production',
    // entry: './src/index.js',
    entry: {
        // app: './src/index.js',
        // print: './src/print.js',
        app: './src/index.js',
        // vendor: ['lodash']
    },
    output: {
        // filename: 'bundle.js',
        filename: '[name].[hash].js',
        // chunkFilename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({ title: '生成新的indexHTML', hash: true }),
        
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.ProvidePlugin({
            "join":['lodash','join']
        })
        // new webpack.optimize.CommonsChunkPlugin({name: 'manifest'})
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    optimization: {
        // splitChunks: {
        //     chunks: 'async',
        //     minSize: 30000,
        //     minChunks: 1,
        //     maxAsyncRequests: 5,
        //     maxInitialRequests: 3,
        //     automaticNameDelimiter: '~',
        //     name: true,
        //     cacheGroups: {
        //         vendors: {
        //             name: 'vendor',
        //         },
        //         manifests: {
        //             name: 'manifest',
        //         },
        //         default: {
        //             minChunks: 2,
        //             priority: -20,
        //             reuseExistingChunk: true
        //         }
        //     }
        // }
    },
    
}