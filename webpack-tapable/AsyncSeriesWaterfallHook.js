/**
 * 异步串行流水钩子 AsyncSeriesWaterfallHook
 * Waterfall 类型的钩子类在当前事件回调返回不为 undefined 的值时，会把下一个事件回调的第一个参数替换成这个值，当然这也是针对 tap 注册的事件回调.其他注册方法触发这一功能的方式如下
 */
const { AsyncSeriesWaterfallHook } = require('tapable')
const hook = new AsyncSeriesWaterfallHook(['name'])

hook.tap('first', name => {
  console.log('first', name)
  // 返回不为 undefined 的值
  return name + ' - ' + 'first'
})

hook.tapAsync('second', (name, callback) => {
  // 因为 tap 注册的事件回调返回了值，所以 name 为 callAsync - first
  console.log('second', name)
  // 在第二个参数中传入不为 undefined 的值
  callback(null, name + ' - ' + ' second')
})

hook.tapPromise('third', name => {
  console.log('third', name)
  // Promise 最终状态被置为 Fulfilled，并且值不为 undefined
  return Promise.resolve(name + ' - ' + 'third')
})

hook.tap('fourth', name => {
  // 当前事件回调没有返回不为 undefined 的值，因此 name 没有被替换
  console.log('fourth', name)
})

hook.callAsync('callAsync', (error, result) => {
  console.log('end', error, result)
})

/**
 * Console output:
 *
 * first callAsync
 * second callAsync - first
 * third callAsync - first -  second
 * fourth callAsync - first -  second - third
 * end null callAsync - first -  second - third
 */
