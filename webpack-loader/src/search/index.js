import '../__base/index.module.less'
import './search.module.less'
console.log('---serach mount')
import { logAge } from '../__base/util.js'
logAge()
import(/* webpackChunkName: "search/route.test" */ './test.js').then(v => {
  console.log('import()', v)
})
