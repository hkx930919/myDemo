"use strict";
exports.__esModule = true;
/**
 * 介绍ts中的类型
 */
//string
var str = '11';
// str  =22 //报错
//bool
var bool = true;
// bool =1//报错
//number 支持二进制 八进制 十进制 十六进制
var num = 0xf00d;
// num=null
//数组 两种方式 
//第一种: 在类型后面加上[]
//第二种,使用数组泛型 Array<元素类型>
var list = [1, 2, 3];
var lis1 = [1, 2, 3];
// lis1 = ['1']
//元组 Tuple 表示已知元素数量和类型的数组 
var x;
x = ['hello', 10];
console.log(x[0].substr(0));
//访问一个越界的元素，会使用联合类型替代 文档是这么写的,可能配置有问题
// x[3] = undefined
x[3] = 'world';
//枚举 最终Color会生成一个对象 { '0': 'Red', '1': 'Green', '2': 'Blue', Red: 0, Green: 1, Blue: 2 }
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Blue;
console.log(c);
console.log(Color);
//any 任何类型, 传入的动态类型
//void 表示没有类型 当一个函数没有返回值的时候就是void
//声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：
function warnUser() {
    console.log("this is my message");
}
warnUser();
//undefined null 默认情况下这两个类型是所有类型的子类型,可是当开启 strictNullChecks 时,undefined和null只能赋值给他们本身和void
var test;
test = undefined;
//never 表示的是那些永不存在的值的类型 返回never的函数必须存在无法达到的终点 或者抛出错误
function infiniteLoop() {
    while (true) {
    }
}
function error(message) {
    throw new Error(message);
}
function fail() {
    return error('something failed');
}
create({});
create(null);
// create(1)//报错
//类型断言  类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构
//两种写法 
//一 尖括号语法
var someValue = 11; //'this is a string'
var strLength = someValue.length;
