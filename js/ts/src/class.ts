//类

// class Greeter {
//     greeting: string;
//     constructor(message: string) {
//         this.greeting = message;
//     }
//     greet(): string {
//         return `hello,${this.greeting}`;
//     }
// }

// //1 继承
// class Animal {
//     name: string;
//     constructor(theName: string) {
//         this.name = theName;
//     }
//     move(distanceInMeters: number = 0): void {
//         console.log(`Animal moved ${distanceInMeters}m.`);
//     }
// }

// class Dog extends Animal {
//     bark() {
//         console.log("Woof! Woof!");
//     }
// }

// const dog = new Dog("xiaogou");

//2 public   protected    private
/**
 * public 字段
 *      1 没有声明的字段,默认都是public
 *
 *
 *
 * private字段
 *      1 不能在声明它的类的外部访问 即实例化后的对象方位私有属性会报错.
 *      2 类型兼容:TypeScript使用的是结构性类型系统。 当我们比较两种不同的类型时，并不在乎它们从何处而来，如果所有成员的类型都是兼容的，我们就认为它们的类型是兼容的。当我们比较带有 private或 protected成员的类型的时候，情况就不同了。 如果其中一个类型里包含一个 private成员，那么只有当另外一个类型中也存在这样一个 private成员， 并且它们都是来自同一处声明时，我们才认为这两个类型是兼容的。 对于 protected成员也使用这个规则。
 *
 *
 *
 * protected
 *      1 不能在声明它的类的外部访问 即实例化后的对象方位私有属性会报错,但是protected成员在派生类中仍然可以访问.
 * 即不能被实例化,但是可以继承
 *
 * private 和protected字段 可以在类的方法(即原型方法中)中访问
 *
 */

class Person {
    protected name: string;
    protected constructor(theName: string) {
        this.name = theName;
    }
}

// Employee 能够继承 Person
// class Employee extends Person {
//     private department: string;

//     constructor(name: string, department: string) {
//         super(name);
//         this.department = department;
//     }

//     public getElevatorPitch() {
//         return `Hello, my name is ${this.name} and I work in ${this.department}.`;
//     }
// }

// let howard = new Employee("Howard", "Sales");
// let john = new Person("John"); // 错误: 'Person' 的构造函数是被保护的.

//3 readonly修饰符
/**
 *      1 readonly关键字将属性设置为只读的。
 *      2 只读属性必须在声明时或构造函数里被初始化。
 */

// class Octopus {
//     readonly name: string;
//     readonly numberOfLegs: number = 8;
//     constructor (theName: string) {
//         this.name = theName;
//     }
// }
// let dad = new Octopus("Man with the 8 strong legs");
// dad.name = "Man with the 3-piece suit"; // 错误! name 是只读的.

//4 参数属性
/**
 * 上诉定义Octopus类,这样定义只读属性name,numberOfLegs,还可以使用参数属性在构造函数中定义;
 * 除了使用readonly来定义, public,protected,private 也是一样
 */
class Octopus {
    readonly numberOfLegs: number = 8;
    constructor(readonly name: string) {}
}

//5  get set 存取器 拦截属性
/**
 * 1 存取器要求你将编译器设置为输出ECMAScript 5或更高。 不支持降级到ECMAScript 3。
 * 2 只带有 get不带有 set的存取器自动被推断为 readonly
 */
let passcode = "secret passcode";

class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        } else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
// if (employee.fullName) {
//     alert(employee.fullName);
// }





//6 静态属性
/**
 * 1 使用static字段来定义
 * 2 访问静态属性要加上类名
 */
class Grid {
    static origin = {x: 0, y: 0};
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor (public scale: number) { }
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));




//7 抽象类 abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法。
/**
 * 1 抽象类做为其它派生类的基类使用。
 * 2 它们一般不会直接被实例化。
 * 3 抽象类可以包含成员的实现细节
 * 4 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现
 */
abstract class Department {

    constructor(public name: string) {
    }

    printName(): void {
        console.log('Department name: ' + this.name);
    }

    abstract printMeeting(): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {

    constructor() {
        super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
    }

    printMeeting(): void {
        console.log('The Accounting Department meets each Monday at 10am.');
    }

    generateReports(): void {
        console.log('Generating accounting reports...');
    }
}
const ag =new AccountingDepartment()
console.log('agggggggggggggg',ag);
ag.printName()
ag.printMeeting()
ag.generateReports()



export {};
