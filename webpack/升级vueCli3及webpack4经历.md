## vue-cli 升级到 3.6.3,webpack 版本 4.28.4

-   vue-cli3 查看配置文件，使用 vue-cli-service inspect||vue inspect，返回 webpack 配置文件
-   修改 webpack 配置文件，在项目根目录生成 vue.config.js
    -   在 vue.config.js 中的 configureWebpack 选项增加或修改 webpakc 配置

### 优化打包后的文件

-   1 使用 webpack-bundle-analyzer 插件查看打包后的体积大小

    ```
    const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

    plugins: [new BundleAnalyzerPlugin()],

    ```

-   2 在 configureWebpack.optimization 优化打包
    -   提取 runtimeChunk,optimization.runtimeChunk(默认为 false,每个 entry chunk 嵌入 runtime)='single'
    -   使用 terser-webpack-plugin 压缩 js,去除打印，debugger,vue-cli3 默认引入 css 压缩
        ```
        optimization.minimizer = [
            new TerserPlugin({
            cache: true,
            parallel: true,
            terserOptions: {
                    compress: {
                    drop_debugger: true,
                    drop_console: true
                    }
                }
            })
        ]
        ```
    -   使用 optimization.splitChunks 提取公共模块（在通常情况下，一般都使用路由懒加载）
        -   提取 nodemodule 的公共内库包。在没有提取的情况下，入口文件构建后的 app.[hash].js 文件很大。此时要设置 splitChunks.cacheGroups.cacheGroupsName.enforce 为 true,将入口文件的包拆分出来
        - 可以将nodemodule的一些库给分开，因为有些可能在部分页面使用，且这些页面时懒加载的，单独拆开后，只有进入该路由时才会请求。
        -   提取公共组件，因为默认的打包设置 optimization.cacheGroups.default.chunks 为 async，所以最好重新配置一个 cacheGroups

        ```
        部分代码

        splitChunks: {
            chunks: "all",
            minSize: 10000, // 提高缓存利用率，这需要在http2/spdy
            maxSize: 0, //没有限制
            minChunks: 2, // 共享最少的chunk数，使用次数超过这个值才会被提取
            maxAsyncRequests: 5, //最多的异步chunk数
            maxInitialRequests: 5, // 最多的同步chunks数
            automaticNameDelimiter: "~", // 多页面共用chunk命名分隔符
            name: true,
            cacheGroups: {
            // 提取vue相关代码
            vue: {
                test(module) {
                if (module.resource) {
                    if (
                    /[\\/]node_modules[\\/](vue|vuex|vue-router)/.test(
                        module.resource
                    )
                    ) {
                    console.log(module.resource);
                    }

                    return /[\\/]node_modules[\\/](vue|vuex|vue-router)/.test(
                    module.resource
                    );
                }
                return false;
                },
                name: "vue",
                // filename: "[name].bundle.js",
                priority: 100,
                chunks: "all",
                reuseExistingChunk: true,
                // !入口文件引入的太多拆不开时，使用enforce
                enforce: true
            },
            //提取第三方库代码
            vendor: {
                // 过滤需要打入的模块
                test: module => {
                    if (module.resource) {
                        const include = [/[\\/]node_modules[\\/]/].every(reg => {
                        return reg.test(module.resource);
                        });
                        const exclude = [
                        /[\\/]node_modules[\\/](vue|vuex|vue-router)/
                        ].some(reg => {
                        return reg.test(module.resource);
                        });
                        return include && !exclude;
                    }
                    return false;
                },
                name: "vendors",
                // filename: "[name].bundle.js",
                priority: 50, // 确定模块打入的优先级
                chunks: "all",
                enforce: true,
                reuseExistingChunk: true // 使用复用已经存在的模块
            },
            // 提取公用组件
            commons: {
                // 其他同步加载公共包
                chunks: "all",
                minChunks: 2,
                name: "commons",
                priority: 40
            }
            }
        }
        ```
