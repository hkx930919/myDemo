const webpack = require('webpack')
const path = require('path')
const Mocha = require('mocha')
const rimraf = require('rimraf')

const mocha = new Mocha({
  timeout: '10000ms'
})
process.chdir(path.join(__dirname, 'template'))

rimraf(path.join(__dirname, './template/dist'), () => {
  const webpackConfig = require('../../lib/webpack.prod')
  webpack(webpackConfig, (err, stats) => {
    console.log('err', err)
    if (err) {
      console.error(err)
      process.exit(2)
    }
    console.log(
      stats.toString({
        colors: true,
        modules: false,
        children: false
      })
    )
    console.log('Webpack build success, begin run test.')
    mocha.addFile(path.join(__dirname, 'html.test.js'))
    mocha.addFile(path.join(__dirname, 'css-js.test.js'))
    mocha.run()
  })
})
