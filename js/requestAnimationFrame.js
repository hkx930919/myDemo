const mySetTimeOut = (cb, interval) => {
  const startTime = Date.now()
  const hasArrive = () => {
    const time = Date.now() - startTime
    console.log(time)

    return time > interval
  }
  let timer
  const loop = () => {
    if (hasArrive()) {
      window.cancelAnimationFrame(timer)
      cb()
    } else {
      timer = window.requestAnimationFrame(loop)
    }
  }
  timer = window.requestAnimationFrame(loop)
}
const mySetInterval = (cb, interval) => {
  let startTime = Date.now()
  const hasArrive = () => {
    const endTime = Date.now()
    const diff = endTime - startTime
    if (diff > interval) {
      startTime = endTime
    }

    return diff > interval
  }
  let timer
  let isStop = false
  const cancelTimer = () => {
    console.log('---cancelTimer')
    isStop = true
    window.cancelAnimationFrame(timer)
  }
  const loop = () => {
    if (hasArrive()) {
      // window.cancelAnimationFrame(timer)
      cb(cancelTimer)
    }
    if (!isStop) {
      timer = window.requestAnimationFrame(loop)
    }
  }
  timer = window.requestAnimationFrame(loop)
}
window.mySetTimeOut = mySetTimeOut
window.mySetInterval = mySetInterval
