export interface Person {
  name: string
  age: number
  //   [propname: string]: any
}

export const logPerson = (p: Person) => {
  console.log('-aaa----+++++++---age:', p.age)
  console.log('-aaa----+++++++------name:', p.name)
}
