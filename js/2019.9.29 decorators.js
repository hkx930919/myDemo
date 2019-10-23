/**
 * 装饰器方法
 */

/**
 * 装饰类的原型方法。在使用中，如果类的方法为async ()=>{} 箭头函数，则会变成类的静态方法，就不会返回一个promise。
 * 使用bind绑定this可以解决这个问题
 * 防止网速慢重复点击，导致多次提交
 */
export const stopClickAgain = () => {
  let done = true
  /**
   * initializer 静态方法有的
   * value 实例方法有的
   */
  return (target, name, descriptor) => {
    const oldValue = descriptor.initializer
      ? descriptor.initializer
      : descriptor.value
    // 原型方法
    // eslint-disable-next-line consistent-return
    descriptor.value = function(...args) {
      if (done) {
        const result = oldValue.apply(this, args)
        if (result instanceof Promise) {
          done = false
          result
            .then(() => {
              done = true
            })
            .catch(err => {
              console.warn(err)
              done = true
            })
        }
        return result
      }
    }
    return descriptor
  }
}
