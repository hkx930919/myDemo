import '../__base/index.module.less'
import './search.module.less'
import { logAge } from '../__base/util'

import(/* webpackChunkName: "search/route.test" */ './test.js').then(v => {
  console.log('import()', v)
})

console.log('---serach mount')

logAge()
