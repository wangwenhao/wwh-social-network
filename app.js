/**
 * Created by Bryant on 2016/12/1.
 */

var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var catchPhrases = ['Why I oughta...', 'Nyuk Nyuk Nyuk!', 'Poifect!', 'Spread out!', 'Say a few syllables!', 'Soitenly!'];

app.set('view engine', 'pug');
app.set('view options', { layout: true });
app.set('views', __dirname + '/views');

app.get('/stooges/chat', function (req, res) {
  res.render('chat');
});

app.get('/stooges/:name?', function (req, res, next) {
  var name = req.params.name;

  switch (name ? name.toLowerCase() : '') {
    case 'larry':
    case 'curly':
    case 'moe':
      res.render('stooges', { stooge: name });
      break;

    default:
      next();
  }
});

app.get('/stooges/*?', function (req, res) {
  res.render('stooges', { stooge: null });
});

app.get('/?', function (req, res) {
  res.render('index');
});

io.sockets.on('connection', function (socket) {
  var sendChat = function (title, text) {
    socket.emit('chat', {
      title: title,
      text: text
    });
  };

  setInterval(function () {
    var randomIndex = Math.floor(Math.random()*catchPhrases.length)
    sendChat('Stooge', catchPhrases[randomIndex]);
  }, 5000);

  sendChat('Welcome to Stooge Chat', 'The Stooge are on the line');
  socket.on('chat', function (data) {
    sendChat('You', data.text);
  });
});

var port = 8080;
server.listen(port);
console.log('在' + port + '端口开启监听！');