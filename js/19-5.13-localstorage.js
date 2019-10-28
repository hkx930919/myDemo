import moment from 'dayjs'

class HliStorage {
  /**
   * 取值 如果没有过期，返回存的值，如果过期了，返回空
   * @param {String} key
   */
  get(key) {
    const { value, date } = JSON.parse(localStorage.getItem(key))
    // 过期
    if (moment().isAfter(date)) {
      this.remove(key)
      return null
    }

    return value
  }

  /**
   * 存值
   * @param {String} key
   * @param {any} value
   * @param {Number} day 天 如果为空则为永久
   */
  set(key, value, day = 7) {
    localStorage.setItem(
      key,
      JSON.stringify({ value, date: moment().add(day, 'day') })
    )
  }

  remove(key) {
    localStorage.removeItem(key)
    console.log('******remove')
  }

  clear() {
    localStorage.clear()
  }
}

const hljStorage = (function() {
  let instance
  return function() {
    return instance || new HliStorage()
  }
})()
export default hljStorage()
