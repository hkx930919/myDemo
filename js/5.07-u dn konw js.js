function fun() {
  console.log(a)
}

function bar() {
  var a = 2
  fun()
}
var a = 3
bar()
console.log('aaa')
