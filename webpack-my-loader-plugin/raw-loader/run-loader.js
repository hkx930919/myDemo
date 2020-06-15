const { runLoaders } = require('loader-runner')
const path = require('path')
const fs = require('fs')
runLoaders(
  {
    resource: path.join(__dirname, './src/index.txt'),
    loaders: [path.join(__dirname, './loader/index.js')],
    readResource: fs.readFile.bind(fs),
    context: { minimize: true }
  },
  (err, result) => {
    err ? console.log('err', err) : console.log(result)
  }
)
