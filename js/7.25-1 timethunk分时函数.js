const timeThunk = (data, fn, count) => {
  const done = () => {
    for (let i = 0; i < Math.min(count || 1, data.length); i++) {
      const query = data.shift()
      fn(query)
    }
  }
  let immediate = true
  return function a() {
    if (immediate) {
      done()
      immediate = false
    }
    setTimeout(() => {
      if (data.length === 0) {
        return
      }
      done()
      a()
    }, 1000)
  }
}

const data = []
for (let i = 0; i < 20; i++) {
  data.push(i)
}
const fn = i => {
  console.log('---------', i)
}
const action = timeThunk(data, fn, 4)
action()
