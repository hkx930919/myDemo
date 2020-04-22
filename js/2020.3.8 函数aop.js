Function.prototype.before = function(beforeFn) {
  const me = this
  return function() {
    console.log('this', this)
    console.log('me', me)

    beforeFn.apply(this, arguments)
    return me.apply(me, arguments)
  }
}
const obj = {
  a: 1,
  logA() {
    console.log('this.a', this.a)
  }
}
obj.logA.before(function() {
  console.log('-----before cb', this)
})()
