/**
 * b数组是否在a中
 * @param {*array} a 
 * @param {*array} b 
 */
const isChild = (a, b) => {
    const map = new Map()
    for (let i = 0; i < a.length; i++) {
        const element = a[i];
        const val = map.get(element)
        if(val){
            map.set(element,val+1)
        }else{
            map.set(element,1)
        }
    }
    for (let j = 0; j < b.length; j++) {
        const aValue = b[j];
        if(!map.get(aValue)){
            return false
        }
    }
    return true
}
const child = [0,1,2,3,4,11,16,100]
const parent = [19,20,99,0,1,2,3,4,11,16]
const result = isChild(parent,child)
// console.log(result)
const s = new Set()
const obj = {}
s.add(obj)
s.add({})
console.log(s);

// for (const i of s) {
//     console.log(i,j);
// }
const flag = s.has(obj)
console.log('flag',flag);

[...s].forEach((val,index)=>{

    console.log('val',val);
    console.log('index',index);
    
})

const m  = new Map()
m.set(1,{})
m.set(2,{})
m.set({},3)

console.log(m.keys());
console.log(m.values());
console.log([...m]);

[...m].forEach((value,i) => {
    console.log('value',value);
    
    console.log('i',i);
    
});
