/**
 * 异步并发钩子
 * AsyncParallel 类型的钩子类会并行执行所有的事件回调，因此异步的事件回调中的错误并不会阻止其他事件回调的运行。会执行第一个抛出错误的函数,后续的错误不会再执行
 * AsyncParallelHook 创建
 * tapAsync | tapPromise 注册
 * callAsync | promise 触发
 */
const { AsyncParallelHook } = require('tapable')
const hook = new AsyncParallelHook(['name'])

hook.tap('first', name => {
  console.log('first', name)
})

hook.tapAsync('second', (name, callback) => {
  setTimeout(() => {
    console.log('second', name)
    callback()
  }, 2000)
})

hook.tapPromise('third', name => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('third', name)
      // 抛出了错误，但是只是提前执行了 callAsync 传入回调函数，并不会阻止其他事件回调运行
      reject('third error')
    }, 1000)
  })
})

hook.callAsync('callAsync', error => {
  console.log('end', error)
})

/**
 * Console output:
 *
 * first callAsync
 * third callAsync
 * end third error
 * second callAsync
 */
