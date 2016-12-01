/**
 * Created by Bryant on 2016/12/1.
 */

var express = require('express');
var app = express();

app.get('/stooges/:name?', function (req, res, next) {
  var name = req.params.name;

  switch (name ? name.toLowerCase() : '') {
    case 'larry':
    case 'curly':
    case 'moe':
      res.send(name + ' is my favorite stooge.');
      break;

    default:
      next();
  }
});

app.get('/stooges/*?', function (req, res) {
  res.send('no stooges listed');
});

app.get('/?', function (req, res) {
  res.send('hello world');
});

var port = 8080;
app.listen(port);
console.log('在' + port + '端口开启监听！');