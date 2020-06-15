/**
 * 异步串行钩子
 * AsyncSeriesHook 创建
 * tapAsync | tapPromise 注册
 * callAsync | promise 触发
 */
const { AsyncSeriesHook } = require('tapable')
const hook = new AsyncSeriesHook(['name'])
console.time('hook start')
/**
 * callAsync调用时要传callback函数，否则在事件回调中执行回调函数可能会报错。
 * 事件回调中接收的 callback 必须要执行，否则不会执行后续的事件回调和 callAsync 传入的回调，这是因为事件回调接收的 callback 已经是对 callAsync 传入的回调做了一层封装的结果了，其内部有一个判断逻辑：
 * 1 如果 callback 执行时不传入值，就会继续执行后续的事件回调。
 * 2 如果传入错误信息，就会直接执行 callAsync 传入的回调，不再执行后续的事件回调；这实际上意味着事件回调执行有错误，也就是说 callAsync 传入的是一个错误优先回调，既然是错误优先回调，那它是可以接收第二个参数的，这个参数将被传入正确的值
 */
// hook.tapAsync('first', (name, cb) => {
//   setTimeout(() => {
//     // 1s后打印
//     console.log('first', name, cb)
//     cb(void 1, 1, 2, 3)
//   }, 1000)
// })
// hook.tapAsync('second', (name, cb) => {
//   setTimeout(() => {
//     // 等待first执行后再执行,2s后会打印
//     console.log('second', name, cb)
//     cb()
//   }, 1000)
// })
// hook.tapAsync('third', (name, cb) => {
//   console.log('third', name, cb)
//   cb()
// })

// hook.callAsync('tom', (err, ...args) => {
//   console.log('callAsync', err, args)
// })
// console.timeEnd('hook start') // hook start: 2.308ms

/**
 * 使用tapPromise注册事件
 */
/**
 * 在使用 tapPromise 注册事件回调时，事件回调必须返回一个 Promise 对象，否则会报错，这是为了确保事件回调能够按照顺序执行。
 *
 */
hook.tapPromise('first', name => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('first', name)
      resolve('first')
    }, 1000)
  })
})
hook.tapAsync('second', (name, cb) => {
  setTimeout(() => {
    console.log('second', name)
    cb()
  }, 1000)
})
/**
 * 如果最后一个注册事件不是tapPromise,那么promise不会执行
 */
hook.tapAsync('third', name => {
  console.log('third', name)
  return Promise.resolve('third')
})

const promise = hook.promise('tom')
console.timeEnd('hook start') // hook start: 2.308ms
console.log('p', promise)

promise.then(
  v => {
    console.log('value', v) // value undefined 值不会传递过来
  },
  e => {
    console.log('reason', e)
  }
)
