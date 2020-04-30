const largeNumber = (numa, numb) => {
  let i = numa.length - 1
  let j = numb.length - 1
  let x
  let y
  let total = ''
  let t = 0
  while (i >= 0 || j >= 0) {
    x = (numa[i] || 0) - 0
    i--
    y = (numb[j] || 0) - 0
    j--
    let num = x + y + t
    if (num >= 10) {
      t = 1
      num -= 10
    } else {
      t = 0
    }
    total = num + total
  }
  if (t) {
    total = t + total
  }
  return total
}

console.log(largeNumber('987', '124'))
