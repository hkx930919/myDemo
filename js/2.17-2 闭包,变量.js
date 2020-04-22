// 1 变量的作用域
// 变量的作用域指的是变量的有效范围.
// 1.1 全局变量和局部变量.
// 1.2 作用域链:函数可以创建作用域,在层层嵌套的函数中,内部函数可以访问外部的变量,而外部函数不能访问内部函数的变量.
//              在js中,没读取到一个函数,就推入栈中.当访问第二层的函数时,第一层的函数被推入了栈,此时第二层的函数可以访问第一层函数的变量

// 2 变量的生存周期
// 2.1 全局变量的生存周期是永久的
// 2.2 局部变量当退出函数时,此时也给销毁了.

// 3 闭包 闭包是函数和声明该函数的词法环境的组合。

// 闭包的作用
// 3.1 闭包就是能够读取其他函数内部变量的函数,可以延长局部变量的生命周期
// eg: 在for循环中的异步操作,为了访问到当时的index,可以使用闭包
const func = (function() {
  let a = 1
  return function() {
    a++
    console.log(a)
  }
})()
func()
func()
func()
// 3.2 把一些不需要暴露的全局变量封装成私有变量
const mult = (function() {
  const cache = {}
  const calculate = function() {
    let a = 1
    for (let i = 0; i < arguments.length; i++) {
      const element = arguments[i]
      a *= element
    }
    return a
  }
  return function() {
    const key = Array.prototype.join.apply(arguments, ',')
    return cache[key] || (cache[key] = calculate())
  }
})()

// 3.3 闭包和面向对象
const extent = function() {
  let a = 1
  return {
    call() {
      a++
      console.log(a)
    }
  }
}

const extent2 = {
  a: 1,
  call() {
    this.a++
    console.log(this.a)
  }
}
// 4 所谓的闭包造成内存泄露
// 理由:局部变量本来应该随着函数退出而销毁,但是因为闭包让函数退出的时候局部变量还存活.
// 反驳:使用闭包的原因就是因为该变量在以后还会使用到,把这些变量放到全局变量和闭包中,对内存的影响是一致的,这里并不能说成时内存泄漏.如果将来要回收这些变量,可以手动将变量设置为null

const tool = {}
const types = [
  'Number',
  'String',
  'Boolean',
  'Object',
  'Array',
  'Undefined',
  'Symbol'
]
for (let i = 0; i < types.length; i++) {
  const type = types[i]
  tool[`is${type}`] = value => {
    return Object.prototype.toString.call(value) === `[object ${type}]`
  }
}

console.log('=====tool', tool)
console.log('isNumber', tool.isNumber('2'))
console.log('isString', tool.isString('2'))
console.log('isObject', tool.isObject({}))
console.log('isArray', tool.isNumber([]))
