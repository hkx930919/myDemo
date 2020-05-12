/**
 * 同步钩子 SyncHook
 * 按照顺序执行事件回调，没有任何其他功能。
 * SyncHook 注册
 * call 触发钩子
 */
/**
 * 1 创建钩子时传入定义的参数，触发钩子时只会将定义的参数传进去，多余的参数不会传递
 */
const { SyncHook } = require('tapable')
const hook = new SyncHook(['name'])

/**
 * 1 注册事件时，可以传递stage参数控制执行顺序，stage越大，执行的越后,不传默认为0
 * 2 传递before参数，可以是字符串也可以是数组，控制在哪个事件之前执行
 * 这两个属性最好不要同时使用，容易造成混乱
 */
hook.tap(
  {
    name: 'first',
    stage: 1
  },
  (name, other) => {
    console.log('trigger first', name, other)
  }
)
hook.tap(
  {
    name: 'second',
    stage: 0
  },
  (name, other) => {
    console.log('trigger second', name, other)
  }
)
hook.tap(
  {
    name: 'third',
    before: 'second'
  },
  (name, other) => {
    console.log('trigger third', name, other)
  }
)

hook.call('test')
/**
 * output
 *
 * trigger third test undefined
 * trigger second test undefined
 * trigger first test undefined
 */
