/**
 * 使用接口进行类型检查 ,对 对象 使用
 *
 */
/**
 * 1 可选属性
 * 2 只读
 * 3 函数类型
 */
interface LabelledValue {
  label: string
  name?: string
  readonly age: Number
  select?(a: string): void
}
function printLabel(v: LabelledValue) {
  console.log(v.label)
  console.log(v.name)
}

let myObj: LabelledValue = { label: 'aaa', age: 1 }
// myObj.age = 2
printLabel(myObj)

/**
 * 对象字面量的特殊对待： 额外属性检查(当将它们赋值给变量或作为参数传递的时候)
 * 如果一个对象字面量存在任何“目标类型”不包含的属性时，你会得到一个错误。
 */
interface P {
  name?: string
  age?: number
  //   [propname: string]: any //索引签名
}
function testPerson(val: P) {
  console.log('name', val.name)
  console.log('age', val.age)
}
// let p: P = { name: 'hhh', a: 1 } // 变量赋值报错了
// testPerson({ name: 'hhh', a: 1 }) // 参数也报错了

/**
 * 三个方法绕过额外属性检查
 */
/********1 类型断言******** */
testPerson({ name: 'hhh', a: 1 } as P)

/********2 添加字符串索引签名******** */
// testPerson({ name: 'hhh', a: 1 })

/********3 将对象赋值给另一个变量******** */
let val = { name: 'hhh', a: 1 }
testPerson(val)

/*******对类使用*************/
/**
 * 接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员
 */
interface ClockInterface {
  currentTime: Date
  setTime(d: Date)
}

class Clock implements ClockInterface {
  currentTime = new Date()
  setTime(v: Date) {
    console.log(v)
  }
}

/**
 * 继承接口
 * 接口继承接口，也可以继承类
 */
interface Shape {
  color: string
}

interface Square extends Shape {
  sideLength: number
}

// 继承类

class Control {
  private state: any
  log() {
    this.state = 10
    console.log('--------------state', this.state)
  }
}
/**
 *如果继承的类有私有属性，那么实现该接口的类 必须是 该接口继承类的子类
 */
interface SelectableControl extends Control {
  select(): void
}

class Button extends Control implements SelectableControl {
  select() {
    // console.log(this.state)
  }
}
// 少了state属性和log方法
// class Image implements SelectableControl {
//   select() {}
// }
const s = new Button()
s.log()
