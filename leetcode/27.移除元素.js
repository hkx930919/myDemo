/*
 * @lc app=leetcode.cn id=27 lang=javascript
 *
 * [27] 移除元素
 */
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
  for (let i = 0; i < nums.length; i++) {
    const ele = nums[i]
    if (ele === val) {
      nums.splice(i, 1)
      i--
    }
  }
  return nums.length
}
let arr = [3, 2, 2, 3]

console.log('result', removeElement(arr, 3))
console.log('arr', arr)
