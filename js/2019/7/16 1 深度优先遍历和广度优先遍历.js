const data = {
  name: 'parent',
  children: [
    {
      name: 'child1',
      children: [
        { name: 'child1-1' },
        { name: 'child1-2' },
        { name: 'child1-3' }
      ]
    },
    {
      name: 'child2',
      children: [
        { name: 'child2-1' },
        { name: 'child2-2' },
        { name: 'child2-3' }
      ]
    },
    {
      name: 'child3',
      children: [
        { name: 'child3-1' },
        { name: 'child3-2' },
        { name: 'child3-3' }
      ]
    }
  ]
}
/***
 * 深度优先
 */
// 1 深度优先递归遍历
const deepFind = (data, nodes = []) => {
  nodes.push(data)
  const { children } = data
  if (children) {
    for (let i = 0; i < children.length; i++) {
      const v = children[i]
      deepFind(v, nodes)
    }
  }
}
const nodes = []
// deepFind(data, nodes)
// console.log('nodes', nodes)

// 2 深度优先非递归
const deepFind2 = data => {
  const nodes = []
  const stack = []
  if (data) {
    stack.push(data)
    while (stack.length) {
      // 永远推入stack的最后一个
      const item = stack.pop()
      nodes.push(item)
      const { children } = item
      if (children) {
        for (let i = children.length - 1; i >= 0; i--) {
          stack.push(children[i])
        }
      }
    }
    console.log('nodes2', nodes)
  }
}

// deepFind2(data)

/**
 * 广度优先
 */
const breadthFind = data => {
  const nodes = []
  const stack = []
  if (data) {
    stack.push(data)
    while (stack.length) {
      // 永远推入stack的最后一个
      const item = stack.shift()
      nodes.push(item)
      const { children } = item
      if (children) {
        for (let i = 0; i < children.length; i++) {
          stack.push(children[i])
        }
      }
    }
    console.log('nodes2', nodes)
  }
}

// breadthFind(data)

const toString = Object.prototype.toString
const map = {
  array: 'Array',
  object: 'Object',
  function: 'Function',
  string: 'String',
  number: 'Number',
  boolean: 'Boolean',
  null: 'Null',
  undefined: 'Undefined'
}
const getType = v => toString.call(v).slice(8, -1)
const isType = (v, type) => map[type] && getType(v) == map[type]
//克隆
const deepClone = obj => {
  let obj2 = {}

  if (isType(obj, 'array') || isType(obj, 'object')) {
    obj2 = isType(obj, 'array') ? [] : {}
    for (const k in obj) {
      if (obj.hasOwnProperty(k)) {
        const v = obj[k]
        obj2[k] = deepClone(v)
      }
    }
  } else if (isType(obj, 'function')) {
    obj2 = eval(`(${obj})`)
  } else {
    obj2 = obj
  }
  return obj2
}
const data2 = {
  a: {
    b: 1
  },
  c: [9, 8, 7]
}
const clonedata = deepClone(data2)
console.log('========', clonedata)
clonedata.c.push('a')
console.log('========11', clonedata)
console.log('========22', data2)
