TODO:懒加载中的react和vue懒加载
## 一 Loader

> loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块

#### 1 打包 CSS 文件

> 1.1 style-loader
> 1.2 css-loader

#### 2 打包图片资源

> 2.1 file-loader
> ####3 打包字体
> 3.1 file-loader 和 url-loader
> ####4 加载数据

-   json 是默认支持的
-   加载 CSV,TSV 和 XML,使用 csv-loader 和 xml-loader
    ```
    +       {
    +         test: /\.(csv|tsv)$/,
    +         use: [
    +           'csv-loader'
    +         ]
    +       },
    +       {
    +         test: /\.xml$/,
    +         use: [
    +           'xml-loader'
    +         ]
    +       }
    ```

## 二 插件 plugins

#### 1 处理 HTML 模板文件

> 1.1 html-webpack-plugin 将打包好的文件自动引入相应的路径

    ```
    +   plugins: [
    +     new HtmlWebpackPlugin({
    +       title: 'Output Management'
    +     })
    +   ],
    ```

#### 2 清理 /dist 文件夹

> 2.1 clean-webpack-plugin 每次打包会清空对应的文件夹

```
    plugins: [
+     new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Output Management'
      })
    ],
```

#### 3 获取打包的 manifest

> 3.1 webpack-manifest-plugin 生成一个 json 数据文件，

```
  new ManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: publicPath,
      })

{//生成的JSON文件
  "main.css": "/static/css/main.67d36d22.chunk.css",
  "main.js": "/static/js/main.f01a7509.chunk.js",
  "main.js.map": "/static/js/main.f01a7509.chunk.js.map",
  "static/css/1.9be6b265.chunk.css": "/static/css/1.9be6b265.chunk.css",
  "static/js/1.dd909eb4.chunk.js": "/static/js/1.dd909eb4.chunk.js",
}
```
#### 4 HMR
>在配置文件中修改devServer.hot=true,同时使用new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin()两个插件

>NamedModulesPlugin:更容易查看要修补(patch)的依赖
>HotModuleReplacementPlugin:webpack的内置热更新插件
#### 5 定义全局变量
>webpack.DefinePlugin
```
+     new webpack.DefinePlugin({
+       'process.env.NODE_ENV': JSON.stringify('production')
+     })
```
#### 5 提取重复代码
>1 webpack.optimize.CommonsChunkPlugin
```
+     new webpack.optimize.CommonsChunkPlugin({
+       name: 'common' // 指定公共 bundle 的名称。
+     })
```








## 三 开发环境配置
#### 1 source-map
>1 开发时的source-map

```
devtool: 'eval-source-map/cheap-eval-source-map',
```
>2 生产时的source-map

```
devtool: 'none/source-map',
```
#### 2 开发时修改代码=>编译代码
>1 webpack's Watch Mode

```
"scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
+     "watch": "webpack --watch",
      "build": "webpack"
    },
```
>2 webpack-dev-server 

```
package.json
"scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "watch": "webpack --watch",
+     "start": "webpack-dev-server --open",
      "build": "webpack"
    },
配置文件
+   devServer: {
+     contentBase: './dist'
+   },
```
#### 3 模块热替换 HMR
>它允许在运行时更新各种模块，而无需进行完全刷新





## 四 tree shaking 
定义：
>在package.json中配置sideEffects，可以配置为false或者数组
- 如果sideEffects为false，webpack可以安全地删除未用到的 export 导出。
- 如果为数组，则指明数组中的文件是有副作用的
- 还可以在module.rules中配置


## 五 生产环境
使用webpack-merage合并基础配置


##六 代码分离
#### 1 多个入口
缺点：
>1 如果入口 chunks 之间包含重复的模块，那些重复模块都会被引入到各个 bundle 中。
>2 这种方法不够灵活，并且不能将核心应用程序逻辑进行动态拆分代码。

####2 动态导入
>1 import() 返回个promise,在.then(res=>{})中，res即为导入的内容
>2 require.ensure 
####3 bundle 分析(bundle analysis)
>webpack-visualizer:可视化并分析你的 bundle，检查哪些模块占用空间，哪些可能是重复使用的。 
