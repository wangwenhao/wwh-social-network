/**
 * Created by Bryant on 2016/12/1.
 */

var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index', { layout: false });
});

var port = 8080;
app.listen(port);
console.log('在' + port + '端口开启监听！');