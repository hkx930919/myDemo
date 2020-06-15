/**
 * 异步并发钩子
 * 会并行执行所有事件回调，但是这个钩子类中的事件回调返回值如果不为 undefined，那么 callAsync 传入的回调函数的第二参数会是最先拥有返回值（这里的返回值有多种方式：return result、callback(null, result) 和 return Promise.resolve(result)）逻辑的事件回调的那个返回值
 * AsyncParallelBailHook 创建
 * tapAsync | tapPromise 注册
 * callAsync | promise 触发
 */
const { AsyncParallelBailHook } = require('tapable')
const hook = new AsyncParallelBailHook(['name'])

hook.tap('first', name => {
  console.log('first', name)
})

// 最先拥有返回值逻辑的事件回调
hook.tapAsync('second', (name, callback) => {
  setTimeout(() => {
    console.log('second', name)
    // 使用 callback 传入了不是 undefined 的返回值。
    callback(null, 'second result')
  }, 1000)
})

// 虽然这个异步的事件回调中的 Promise 对象会比第二个异步的事件回调早执行完毕，
// 但是因为第二个事件回调中已经拥有了返回值的逻辑，
// 因此这个事件回调不会执行 callAsync 传入的回调函数。
// 除非将third的执行顺序放到前面去,就会先执行这个值的回调
hook.tapPromise('third', name => {
  console.log('third', name)
  // 返回了一个 Promise 对象，并且它的状态是 Fulfilled, 值不为 undefined。
  return Promise.resolve('third result')
})

hook.callAsync('callAsync', (error, result) => {
  console.log('end', error, result)
})

/**
 * Console output:
 *
 * first callAsync
 * third callAsync
 * second callAsync
 * end null second result
 */
