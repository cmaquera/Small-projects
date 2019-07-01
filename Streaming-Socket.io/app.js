
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);

server.listen(3737);
console.log("corriendo en el puerto 3737");

var io = require("socket.io").listen(server);
io.sockets.on('connection', function(socket){
    socket.on('newFrame', function(img){
        io.sockets.emit('setFrame', img);
    });
});

/*
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);
// WARNING: app.listen(80) will NOT work here!

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});*/