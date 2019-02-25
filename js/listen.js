const express = require('express');

const app = express();
app.use(express.static('./public'));

app.get('/a', (req, res) => {
  console.log('进入服务');
});

app.post('listen', (req, res) => {
  console.log(req, res);
});
app.listen(3001, () => {
  console.log('服务已启动');
});
