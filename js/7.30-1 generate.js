/********
 * iterator接口返回一个对象包含next方法，调用next()方法，返回next().value
 */
// const someThing = (function() {
//   let nextValue
//   return {
//     next() {
//       if (nextValue === undefined) {
//         nextValue = 1
//       } else {
//         nextValue = nextValue * 3 + 6
//       }
//       return { value: nextValue, done: false }
//     },
//     [Symbol.iterator]() {
//       console.log('this', this)

//       return this
//     }
//   }
// })()
// // console.log(someThing.next().value)
// // console.log(someThing.next().value)
// // console.log(someThing.next().value)
// // console.log(someThing.next().value)

// for (const v of someThing) {
//   console.log('------', v)
//   if (v > 500) {
//     return
//   }
// }

function* gen1() {
  try {
    let nextVal
    while (true) {
      if (nextVal === undefined) {
        nextVal = 1
      } else {
        nextVal = nextVal * 3 + 6
      }
      yield nextVal
    }
  } finally {
    console.log('clean-----')
  }
}
// const it = gen1()
// for (const v of it) {
//   console.log(v)
//   if (v > 500) {
//     const val = it.return('www')
//     console.log('^^^^', val.value)
//   }
// }

// 生成器+promise
function run(gen, ...args) {
  const it = gen.apply(this, args)
  return Promise.resolve().then(function handleNext(value) {
    let next = it.next(value)

    return (function handleResult(next) {
      if (next.done) {
        return next.value
      } else {
        return Promise.resolve(next.value).then(handleNext, function handleErr(
          err
        ) {
          return Promise.resolve(it.throw(err)).then(handleResult)
        })
      }
    })(next)
  })
}

// next赋值
function* gen2(x) {
  const y = x * (yield 'a')
  return y
}
// const gen2Ins = gen2(2)

// console.log(gen2Ins.next().value)
// console.log(gen2Ins.next(10).value)

// gen2Ins.next(10).value

function* foo() {
  console.log('inside foo---', yield 'B')
  console.log('inside foo---', yield 'C')
  return 'D'
}
function* bar() {
  console.log('inside bar---', yield 'A')
  console.log('inside bar---', yield* foo())
  console.log('inside bar---', yield 'E')
  return 'F'
}

let it = bar()

console.log('outside:', it.next().value)
console.log('outside:', it.next(1).value)
console.log('outside:', it.next(2).value)
console.log('outside:', it.next(3).value)
console.log('outside:', it.next(4).value)
