# virtual-list 虚拟列表

- 只渲染可视区域的内容(动态数据),如果有 1000 条数据(不分页),真实渲染出来的可能不到 50 条.
- 一块区域将内容全给撑开,使用`transform`移动可视区域的 dom,根据`scrollTop`获取可视区域的数据

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```

### Run your tests

```
yarn run test
```

### Lints and fixes files

```
yarn run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
