function hello(word:string){
    console.log(`hello ${word}`)
}


hello('123')

/**
 * ts 接口  只在两个类型内部的结构兼容那么这两个类型就是兼容的
 *
 */
// interface Person {
//     firstName:string,
//     lastName:string
// }





/**
 * 类
 * 
 * 
 */
class Student{
    fullName:string
    constructor(public firstName:string,public middleInitial:number,public lastName:any){
        this.fullName = `${firstName} ${middleInitial} ${lastName}`
    }
}
interface  Person {
    firstName:string,
    lastName:string
}
function greeter (person:Person){
    console.log(`hello,${person.firstName} ${person.lastName}`)
}
let user = {firstName:'第一个',lastName:'第二个'}

greeter(user)
let str:string

str  ='1aaa'

const student = new Student('first',1,'lastname')
console.log('===student',student);
