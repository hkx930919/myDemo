// 介绍三个数组api flatMap flat reduce
// 1 flatMap 它与 map 和 深度值1的 flat 几乎相同，但 flatMap 通常在合并成一种方法的效率稍微高一些。
// 调用时将数组那一项用
[1, [2, 3], 4].flatMap(v => v + 1);// [2, "2,31", 5]
[1, [2, 3], 4].flatMap(v => v);// [1, 2, 3, 4]

// 2 flat 将数组扁平化 参数是扁平化的数组深度值
const arr1 = [1, 2, [3, 4]];
arr1.flat();// [1, 2, 3, 4]

const arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat();// [1, 2, 3, 4, [5, 6]]

const arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2);// [1, 2, 3, 4, 5, 6]

// 3 flatDepp 递归的调用flatMap
const flatDepp = (arr, callback) => (Array.isArray(arr) ? arr.reduce((a, b, c, d) => {
  const e = Array.isArray(b) ? flatDepp(b) : [callback(b, c, d)];
  return [...a, ...e];
}, []) : [arr]);
