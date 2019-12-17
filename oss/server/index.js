const express = require('express')
const { STS } = require('ali-oss')
const fs = require('fs')

const app = express()
const path = require('path')
const conf = require('./oss-config')

const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
}
app.use(allowCrossDomain)

app.get('/sts', (req, res) => {
  console.log(conf)
  let policy
  if (conf.PolicyFile) {
    policy = fs
      .readFileSync(path.resolve(__dirname, conf.PolicyFile))
      .toString('utf-8')
  }

  const client = new STS({
    accessKeyId: conf.AccessKeyId,
    accessKeySecret: conf.AccessKeySecret
  })

  client
    .assumeRole(conf.RoleArn, policy, conf.TokenExpireTime)
    .then(result => {
      console.log('====success', result)
      res.set('Access-Control-Allow-Origin', '*')
      res.set('Access-Control-Allow-METHOD', 'GET')
      res.json({
        AccessKeyId: result.credentials.AccessKeyId,
        AccessKeySecret: result.credentials.AccessKeySecret,
        SecurityToken: result.credentials.SecurityToken,
        Expiration: result.credentials.Expiration
      })
    })
    .catch(err => {
      console.log('xxxxxxxxxxxx error', err)
      res.status(400).json(err.message)
    })
})

app.use('/static', express.static('public'))
// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../index.html'))
// })

app.listen(9000, () => {
  console.log('App started.')
})
