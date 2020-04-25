// import largeNumber from '../../webpack-large-number'
// console.log('====largeNumber', largeNumber)
import '../__base/index.module.less'
import aStyles from '../__base/a.module.less'
import aCssStyles from '../__base/a.module.css'

console.log('process.env', process.env)
console.log('process.env.BUILD_ENV', process.env.BUILD_ENV)
console.log('process.env.NODE_ENV', process.env.NODE_ENV)

setTimeout(() => {
  import(/* webpackChunkName: "index/route.test" */ './test.js').then(v => {
    console.log('import(index/test)', v)
  })
}, 1000)

const div = document.createElement('div')
div.innerHTML = '我是一个div'
div.className = aCssStyles['a-flex']
document.body.append(div)
