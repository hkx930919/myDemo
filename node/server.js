const express = require('express');

const app = express();
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,authorization ');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By', ' 3.2.1');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});
app.get('/', (req, res) => {
  res.send({ a: 1 });
  console.log('***进入了', req);
});
app.get('/hms/hcySaas/appApi/userNew/getTokenByWxUserId', (req, res) => {
  res.send({
    status: {
      retCode: 1,
    },
  });
  console.log('******************进入了');
});
app.get('/hms/hcySaas/appApi/billingOrder/list', (req, res) => {
  res.send({
    status: {
      retCode: 20014001,
    },
  });
  console.log('******************进入了');
});

app.listen(3005, () => {
  console.log('server start');
});
