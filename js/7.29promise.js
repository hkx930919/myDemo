/**
 * 关于Promise.resolve 和 new Promise 里的resolve函数
 */

const rejectPh = {
  then: function(resolved, rejectd) {
    rejectd('oopp')
  }
}

// 此处会展开 rejectPh这个thenable，调用then方法，然后reject了，如果没有 catch Promise,那就会抛出错误
// const rejectPr = Promise.resolve(rejectPh)

// rejectPr.then(
//   res => {
//     console.log('success', res)
//   },
//   err => {
//     console.log('error', err)
//   }
// )

new Promise(function(resolve, reject) {
  /******
   * 传入了reject，那么这个promise就变成了reject状态
   */
  resolve(Promise.reject('oopp'))
}).then(
  res => {
    console.log('success', res)
  },
  err => {
    console.log('error', err)
  }
)
