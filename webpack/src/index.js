// import _ from 'lodash'
// // import './style.css'
// // import myImage from './image/nav_boy.png'
// import data from './data/data.json'
// // import dataXML from './data/data.xml'
// import print from "./print.js";
import './style/style.css'
// import {squre} from './util/index.js'

function component() {
  var el = document.createElement('div')
  var btn = document.createElement('button')
  var br = document.createElement('br')

  el.innerHTML = ['hello', 'webpack', 'test111'].join(' ')
  // el.innerHTML =`webpack测试,5*5等于${squre(5)}${data['name']}`
  btn.innerHTML = '点击后检查有没有打印1234'
  btn.onclick = e =>
    import(/* webpackChunkName: "print" */ './print').then(module => {
      var print = module.default
      console.log(e)

      print()
    })

  el.appendChild(br)
  el.appendChild(btn)
  return el
}
document.body.appendChild(component())

// function getComponent() {
//     return import(/* webpackChunkName: "lodash" */ 'lodash').then(_=>{
//         var el = document.createElement('div');
//         el.innerHTML = _.join(['hello1','webpack'],'1')
//         return el
//     })
// }
// getComponent().then(el=>{
//     document.body.appendChild(el)
// })
