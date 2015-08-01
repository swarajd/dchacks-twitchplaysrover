var express = require('express');
var path = require('path');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(path.join('public')));

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('command', function(cmd) {
    console.log(cmd);
  });
  socket.on('disconnect', function() {
    console.log('a user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
