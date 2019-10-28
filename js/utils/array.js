/**
 * 获取一个数组
 * @param {number} count
 * @param {arr} array
 */
const getArrWithCount = (count, array) => {
  let arr = []
  for (let i = 0; i < count; i++) {
    arr.push((array && array[i]) || i)
  }
  return arr
}

module.exports = {
  getArrWithCount
}
