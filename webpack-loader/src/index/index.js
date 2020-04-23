// import largeNumber from '../../webpack-large-number'
// console.log('====largeNumber', largeNumber)
import '../__base/index.module.less'
import '../__base/a.module.less'

console.log('===data33444')
import(
  /* webpackChunkName: "index/route.search.test" */ '../search/test.js'
).then(v => {
  console.log('import(search/test)', v)
})
setTimeout(() => {
  import(
    /* webpackChunkName: "index/route.search.index" */ '../search/index.js'
  ).then(v => {
    console.log('import(search/index)', v)
  })
}, 1000)
