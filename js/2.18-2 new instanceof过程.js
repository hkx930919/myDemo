// 1 new的过程
// 1 生成一个对象
// 2 绑定原型
// 3 绑定this
// 4 返回该对象
// 实现new过程
function create() {
  const constructor = Array.prototype.shift.call(arguments);
  const obj = new Object();
  obj.__proto__ = constructor.prototype;
  const result = constructor.apply(obj, arguments);
  return typeof result === 'object' ? result : obj;
}


// 2 instanceOf实现
function myInstanceOf(left, right) {
  const { prototype } = right;
  left = left.__proto__;
  while (true) {
    if (left == null) {
      return false;
    }
    if (left == prototype) {
      return true;
    }
    left = left.__proto__;
  }
}
