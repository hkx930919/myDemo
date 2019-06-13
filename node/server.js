// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express')

const app = express()
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With,authorization,http-access-token'
  )
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})
app.get('/hps/home/common/merchant/merchantInfo', (req, res) => {
  res.send({
    status: {
      code: 0,
      retCode: 0,
      msg: 'success'
    },
    data: {
      id: 365962,
      name: '测试海洋店铺婚纱摄影',
      logoPath: 'http://qnm.hunliji.com/o_1cpedqtud1a3g1l221cbt128v1klqn.jpg',
      address: '中国上海测试中心',
      isPro: 2,
      latitude: '31.191135',
      longitude: '121.610114',
      coverPath: 'http://qnm.hunliji.com/o_1cpedr5pch2tfpd137v158v1cmps.jpg',
      proUltimateServerEnd: null
    },
    time: 1559096474
  })
})
app.post(
  '/hms/businessCard/admin/localServerMerchant/businessCard/openCard',
  (req, res) => {
    setTimeout(() => {
      res.send({
        status: {
          code: 0,
          retCode: 0,
          msg: 'success'
        },
        data: null,
        time: 1559099960
      })
    }, 2500)
  }
)

app.listen(3005, () => {
  console.log('server start')
})
