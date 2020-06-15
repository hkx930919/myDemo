/**
 * hook拦截器
 */
const { SyncHook } = require('tapable')
const hook = new SyncHook()

hook.intercept({
  // 注册时执行
  register(tap) {
    console.log('register', tap)
    return tap
  },
  // 触发事件时执行
  call(...args) {
    console.log('call', args)
  },
  // 在 call 拦截器之后执行
  loop(...args) {
    console.log('loop', args)
  },
  // 事件回调调用前执行
  tap(tap) {
    console.log('tap', tap)
  }
})
hook.tap({ name: 'first', context: true }, context => {
  console.log('first', context)
})
hook.tap('second', () => {
  console.log('first')
})
hook.call()
