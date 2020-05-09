const glob = require('glob')

describe('生成js|css文件', () => {
  it('js', done => {
    const files = glob.sync('dist/*/*.js')
    console.log('files', files)

    if (files.length) {
      done()
    } else {
      throw new Error('没有js')
    }
  })
  it('css', done => {
    const files = glob.sync('dist/*/*.css')
    console.log('files', files)
    if (files.length) {
      done()
    } else {
      throw new Error('没有css')
    }
  })
})
