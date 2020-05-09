const { expect } = require('chai')
const path = require('path')

process.chdir(path.join(__dirname, '../smoke/template'))
describe('entry', () => {
  it('has search page', () => {
    const webpackConfig = require('../../lib/webpack.prod')
    console.log('entry1111', webpackConfig.entry)

    expect(webpackConfig.entry).to.property('search/index')
  })
})
