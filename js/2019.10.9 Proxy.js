/**
 * 1 get和set默认处理使用Reflect
 * 2 触发多次set和get
 */

const arr = [1,2,3]
const handler = {
    set(t,k,v,r){
        console.log('set:',k,v);
        // t[k]=v
        // return true
        return  Reflect.set(t,k,v,r)
    },
    get(t,k,r){
        console.log('get:',k);
        // console.log('receiver:',r);
        const res = Reflect.get(t,k,r)
        console.log('res:',res);
        
        // return t[k]
        return res
    }
}
const pArr = new Proxy(arr,handler)
pArr.push(4)
// pArr.unshift(4) // 触发多次的set和get，将值一个个往后挪动
                /*
                get: unshift
                get: length
                get: 2
                set: 3 3
                get: 1
                set: 2 2
                get: 0
                set: 1 1
                set: 0 4
                set: length 4
                */


/**
 * 3 深层次对象不能监听，只能代理一层
 */
const deepData = {
    a:{b:1},
    c:[]
}
console.log('=======================');

const p = new Proxy(deepData,handler)
p.a.d=2
p.c.unshift(3) // 只触发了get