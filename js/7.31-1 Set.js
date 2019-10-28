let arr1 = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }]
let arr2 = [{ id: 1 }, { id: 2 }, { id: 3 }]

// const s1 = new Set(arr1)
let m1 = new Map()
for (let i = 0; i < arr2.length; i++) {
  const element = arr2[i]
  m1.set(element.id, element)
}
// const resArr = arr1.filter(v => !arr2.some(o => o.id === v.id))
const resArr = arr1.filter(v => !m1.has(v.id))
// arr1.filter(v=>)
// console.log(resArr)
console.log('m1', m1)
console.log('resArr', resArr)
