// 1 浅拷贝
// 1.1 浅拷贝对数组和对象有相互引用的问题
// 1 Object.assign(),...扩展符都可以解决


// 2 深拷贝
// 2.1 JSON.parse(JSON.stringify(data))
// 2.1.1 忽略undefined,不能序列化函数,忽略symbol,不能解决循环引用问题

// 2.2 使用MessageChannel消息通道,可以解决循环引用和忽略undefined的问题,但还是无法序列化函数
function deepCloneByMessageChannel(data) {
  return new Promise((reslove, reject) => {
    const { port1, port2 } = new MessageChannel();
    port1.onmessage = (e) => {
      reslove(e.data);
    };
    port2.postMessage(data);
  });
}
const obj = {
  a: 1,
  b: undefined,
};
// deepCloneByMessageChannel(obj).then((data) => {
//   console.log(data);// {a: 1, b: undefined}
//   console.log(data == obj);// false
// });


// 2.3 递归
function deepClone(target) {
  const obj = Array.isArray(target) ? [] : {};
  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      const element = target[key];
      if (typeof element == 'object') {
        obj[key] = deepClone(element);
      } else {
        obj[key] = element;
      }
    }
  }
  return obj;
}

const a = {
  b: {
    c: [0, 1],
  },
  d: 2,
};
const copyA = deepClone(a);
console.log(copyA);
console.log(copyA == a);
