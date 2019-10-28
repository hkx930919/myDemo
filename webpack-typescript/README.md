#webpack 结合 typescript

## 插件安装

`yarn add webpack typescript webpack-dev-server ts-loader`

### 1 解析 ts 文件

安装`typescript ts-loader`

```js
 { test: /\.tsx?$/, loader: 'ts-loader', exclude: /(node_modules)/ },
```

### 2 tslint 校验

安装`tslint tslint-loader tslint-config-prettier tslint-config-alloy`

_tslint-config-alloy_ tslint 规则的一种方案
_tslint-config-prettier_ tslint 中的 prettier 支持

```js
{
    test: /\.tsx?$/,
    loader: 'tslint-loader',
    enforce: 'pre',
    exclude: /(node_modules)/
},
```

### 3 TODO： 增加 babel 解析
