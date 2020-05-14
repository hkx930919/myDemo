const { interpolateName } = require('loader-utils')
const path = require('path')
const cwd = process.cwd()
module.exports = function(source) {
  console.log('source', source, typeof source)
  const data = JSON.stringify(source)
  const url = interpolateName(this, '[name].[ext]', { source })
  console.log('---url', url, path.join(__dirname, url))

  this.emitFile(url, source + '222222')
  return `export default ${data}`
}
