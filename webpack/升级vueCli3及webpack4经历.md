### 1 vue-cli 升级到 3.6.3,webpack 版本 4.28.4

-   vue-cli3 查看配置文件，使用 vue-cli-service inspect||vue inspect，返回 webpack 配置文件
-   修改 webpack 配置文件，在项目根目录生成 vue.config.js
    -   在 vue.config.js 中的 configureWebpack 选项增加或修改 webpakc 配置

### 2 优化打包后的文件体积

-   1 使用 webpack-bundle-analyzer 插件查看打包后的体积大小

    ```
    const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

    plugins: [new BundleAnalyzerPlugin()],

    ```

-   2 在 configureWebpack.optimization 优化打包

    -   2.1 提取 runtimeChunk,optimization.runtimeChunk(默认为 false,每个 entry chunk 嵌入 runtime)='single'
    -   2.2 使用 terser-webpack-plugin 压缩 js,去除打印，debugger,vue-cli3 默认引入 css 压缩(optimize-css-assets-webpack-plugin)
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
    -   2.3 使用 optimization.splitChunks 提取公共模块（在通常情况下，一般都使用路由懒加载）

        -   提取 nodemodule 的公共内库包。在没有提取的情况下，入口文件构建后的 app.[hash].js 文件很大。此时要设置 splitChunks.cacheGroups.cacheGroupsName.enforce 为 true,将入口文件的包拆分出来
        -   可以将 nodemodule 的一些库给分开，因为有些可能在部分页面使用，且这些页面时懒加载的，单独拆开后，只有进入该路由时才会请求。
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
                reuseExistingChunk: true,//利用存在的chunk
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

-   3 使用 mini-css-extract-plugin 提取 css 文件

    ```
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");

    //插件配置
    plugins:[
    	new MiniCssExtractPlugin({
    		filename: '[name].[contenthash].css',//直接引用的css文件
    		chunkFilename: '[name].[contenthash].css'//间接引用的css文件
    	}),

    	new webpack.HashedModuleIdsPlugin() //防止moduleid不同，导致内容变化
    ],
    ```

### 3 优化构建速度

-   1 resolve.alias 配置绝对路径。此时 vscode 智能代码导航就失效了，可以在目录下配置 jsconfig.json 文件解决这个问题

    ```
    webpack

    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname,'node_modules'),
        ],
        alias: {
        components: path.resolve(__dirname, '/src/components'),
        },
    }

    ```

    ```
    jsconfig.json

    {
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
        "src/*": ["./src/*"],
        "components/*": ["./src/components/*"],
        "assets/*": ["./src/assets/*"],
        "pages/*": ["./src/pages/*"]
        }
    },
    "include": ["./src/**/*"]
    }

    ```

-   2 构建结果缓存

    -   1 babel-loader 通过 cacheDirectory 开启缓存

        ```
        test: /\.jsx?$/,
        use: [
            {
                loader: resolve('babel-loader'),
                options: {
                babelrc: false,
                // cacheDirectory 缓存babel编译结果加快重新编译速度
                cacheDirectory: path.resolve(options.cache, 'babel-loader'),
                presets: [[require('babel-preset-imt'), { isSSR }]],
                },
            },
        ],

        ```

    -   2 eslint-loader 缓存,通过 cache 选项指定缓存路径
        ```
        test: /\.(js|mjs|jsx)$/,
        enforce: 'pre',
        use: [
            {
            options: {
                cache: path.resolve(options.cache, 'eslint-loader'),
            },
            loader: require.resolve('eslint-loader'),
            },
        ],
        ```
    -   3 css/scss 缓存。css-loader/sass-loader/postcss-loader 本身并没有提供缓存机制，这里需要用到 cache-loader 辅助我们实现对 css/scss 的构建结果缓存，具体使用方式如下：
        **cache-loader 需要添加到最头部**

    ```
    {
        test: /\.m?jsx?$/,
        exclude: [
          function() {
            /* omitted long function */
          }
        ],
        use: [
          {
            loader: "cache-loader",
            options: {
              cacheDirectory:
                "D:\\primate\\vueCli3.0\\o2oh5vue\\node_modules\\.cache\\babel-loader",
              cacheIdentifier: "767075ce"
            }
          },-loader
          {
            loader: "babel-loader"
          }
        ]
      },

    ```

-   3 开启多核压缩，TerserPlugin 插件，删除打印等多余代码
-   4 缩小 babel-loader 处理范围
    ```
    // 指处理指定目录的文件
    include: [
        path.resolve(projectDir, 'src'),
        path.resolve(projectDir, 'node_modules/@tencent'),
    ].filter(Boolean),
    // 忽略哪些压缩的文件
    exclude: [/(.|_)min\.js$/],
    ```
- 5 使用happy-loader开启多进程解析
        ```
        npm i happypack@next -D
        const HappyPack = require("happypack");
        const os = require("os");
        const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

         {
            test: /\.vue$/,
            loader: "happypack/loader?id=happyVue"
        },
        {
            test: /\.js$/,
            loader: "happypack/loader?id=happyBabel",
            include: [
            resolve("src"),
            resolve("test"),
            resolve("node_modules/webpack-dev-server/client")
            ]
        },
        
        plugins: [
            new HappyPack({
                id: "happyBabel",
                loaders: [
                    {
                    loader: "babel-loader",
                    options: {
                        babelrc: true
                        // cacheDirectory: true // 启用缓存
                    }
                    }
                ],
                threadPool: happyThreadPool
            }),
            new HappyPack({
                id: "happyVue",
                loaders: [
                    {
                    loader: "vue-loader",
                    options: vueLoaderConfig
                    }
                ],
                threadPool: happyThreadPool
            }),
        ]

```

#### 拎出来的 PreloadPlugin

> vue 中的 PreloadPlugin 时经过改写的。preload 入口文件的模块，prefetch 异步模块，[文档](https://github.com/vuejs/preload-webpack-plugin)


```
    new PreloadPlugin({
        rel: "preload",
        include: "initial",
        fileBlacklist: [/\.map$/, /hot-update\.js$/]
    }),
    /* config.plugin('prefetch') */
    new PreloadPlugin({
        rel: "prefetch",
        include: "asyncChunks"
    }),
```
