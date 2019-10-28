console.log(require.extensions, module)
function testObj(obj) {
  obj = { a: 1 }
  console.log('inner', obj)
}
var a = { b: 1 }
testObj(a)
console.log('outer', a)
