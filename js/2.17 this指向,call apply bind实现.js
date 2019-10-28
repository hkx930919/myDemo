// 1 this的使用场景
// 1.1 当做对象的方法进行调用,此时指向该对象
// 1.2 当做普通函数调用,此时指向window
// 1.3 在构造函数中,如果使用new实例化,那么指向实例对象
// 1.4 call和apply中,this指向第一个参数.如果第一个参数为null,严格模式中为null,非严格模式中指向默认的this
// function test(a, b) {
//   console.log(this);

//   console.log(a, b);
// }
// test.call(null, '1', '2');

// 2 call和apply的区别
// 2.1 调用的形式不一样,apply(this对象,参数数组:[]),call(this对象,参数1,参数2,参数3).call是apply的一个语法糖,如果确定了
// 2.2 借用其他对象的方法
function test1(a, b) {
  console.log(this);
  console.log(a, b);
}
// test1.call(null, '1', '2')
// test1.apply(null, [1, 2])

// 3 call和apply的作用
// 3.1 修改this指向

// 4 call和apply的实现
// 4.1 call实现
Function.prototype.mycall = function (context) {
  const con = context || window;
  const arg = [];
  const len = arguments.length;
  for (let i = 1; i < len; i++) {
    arg.push(`arguments[${i}]`);
  }
  con.___fn = this;
  const result = eval(`con.___fn(${arg})`);
  delete con.___fn;
  return result;
};

test1.call({ a: 1 }, 2, 3);

// 4.2 apply实现

Function.prototype.myapply = function (context, args) {
  const con = context || window;
  con.___fn = this;
  if (!args) {
    return con.___fn();
  }
  const arg = [];
  const len = args.length;
  for (let i = 1; i < len; i++) {
    arg.push(`arr[${i}]`);
  }
  const result = eval(`con.___fn(${arg})`);
  delete con.___fn;
  return result;
};

// 5 bind 实现
Function.prototype.mybind = function (context, ...rest) {
  const self = this;
  return function F() {
    if (this instanceof F) {
      return new self(...rest, ...arguments);
    }
    const args = rest.concat(arguments);
    return self.apply(context, args);
  };
};
