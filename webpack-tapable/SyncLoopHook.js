/**
 * 同步循环钩子 SyncLoopHook
 * Loop 类型的钩子类在当前执行的事件回调的返回值不是 undefined 时，会重新从第一个注册的事件回调处执行，直到当前执行的事件回调没有返回值。
 */
const { SyncLoopHook } = require('tapable')
const hook = new SyncLoopHook(['name'])
const INDENT_SPACE = 4
let firstCount = 0
let secondCount = 0
let thirdCount = 0
let indent = 0

function indentLog(...text) {
  console.log(new Array(indent).join(' '), ...text)
}

hook.tap('first', name => {
  if (firstCount === 1) {
    firstCount = 0
    indent -= INDENT_SPACE
    indentLog('</callback-first>')
    return
  }
  firstCount++
  indentLog('<callback-first>')
  indent += INDENT_SPACE
  return true
})

hook.tap('second', name => {
  if (secondCount === 1) {
    secondCount = 0
    indent -= INDENT_SPACE
    indentLog('</callback-second>')
    return
  }
  secondCount++
  indentLog('<callback-second>')
  indent += INDENT_SPACE
  return true
})

hook.tap('third', name => {
  if (thirdCount === 1) {
    thirdCount = 0
    indent -= INDENT_SPACE
    indentLog('</callback-third>')
    return
  }
  thirdCount++
  indentLog('<callback-third>')
  indent += INDENT_SPACE
  return true
})

hook.call('call')

/**
 * Console output:
 *
 *  <callback-first>
 *  </callback-first>
 *  <callback-second>
 *     <callback-first>
 *     </callback-first>
 *  </callback-second>
 *  <callback-third>
 *     <callback-first>
 *     </callback-first>
 *     <callback-second>
 *         <callback-first>
 *         </callback-first>
 *     </callback-second>
 *  </callback-third>
 */
