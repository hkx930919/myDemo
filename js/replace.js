const a = 'a[0].a-b.c.d'

const patt = /([^-]*)-([^-]*)/g
a.replace(patt, (...args) => {
  console.log('===args', args)
})
