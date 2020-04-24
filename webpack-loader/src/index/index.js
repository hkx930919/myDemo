// import largeNumber from '../../webpack-large-number'
// console.log('====largeNumber', largeNumber)
import '../__base/index.module.less'
import '../__base/a.module.less'

console.log('===data33444')

setTimeout(() => {
  import(/* webpackChunkName: "index/route.test" */ './test.js').then(v => {
    console.log('import(index/test)', v)
  })
}, 1000)
