// const glob = require('glob-all')
const glob = require('glob')
const path = require('path')
describe('生成html文件', () => {
  it('html', done => {
    // const files = glob.sync([
    //   path.join(__dirname, './template/dist/index/index.html'),
    //   path.join(__dirname, './template/dist/search/index.html')
    // ])
    const files = glob.sync('dist/*/*.html')
    console.log('--files', files)

    if (files.length) {
      done()
    } else {
      throw new Error('没有html')
    }
  })
})
