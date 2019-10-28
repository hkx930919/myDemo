// 1 基本类型
// 6种 null,undefined,string,number,boolean,symbol

// 2 typeof
// 2.1 typeof 判断基本类型时除了判断null都是正确的.要注意NaN是术语number的
// 注意:null判断错的原因是因为在 JS 的最初版本中，使用的是 32 位系统，为了性能考虑使用低位存储了变量的类型信息，000 开头代表是对象，然而 null 表示为全零，所以将它错误的判断为 object 。虽然现在的内部类型判断代码已经改变了，但是对于这个 Bug 却是一直流传下来。
// 2.2 判断引用类型:除了函数,其他都是返回object
// 2.3 可以使用Object.prototype.toString.call(obj)来判断类型,返回"[object Type]"

// 3 类型转换
// 3.1 null undefined NaN 0 +0 -0 '' false转化成false,其他都是true,包括空对象和空数组
// 3.2 四则运算转换 除了加法,其他的运算只要其中一方为数字,都将另一方转化为数字.加法中,如果有一方为字符串,则另一方默认转化为字符串
// 3.3 ==号转化规则
// 前提条件,当两边的类型不同时:
// 3.3.1 当一方为null,一方为undefined,返回true
// 3.3.2 当一方为number,一方为string,将string转化为number再比较
// 3.3.3 当一方为boolean,将Boolean转化为number,然后进行比较
// 3.3.3 当一方为object,一方为number||string,将object转为基本类型再进行比较


// 4 对象转基本类型 调用的顺序依次为[Symbol.toPrimitive]>valueOf>toString
const a = {
  valueOf() {
    return 0;
  },
  toString() {
    return 1;
  },
  [Symbol.toPrimitive]() {
    return 3;
  },
};
console.log(1 + a);// 打印出4
