var express = require('express');
var path = require('path');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request');
var sp = require('serialport');
var SerialPort = sp.SerialPort;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(path.join('public')));

var serialPort = new SerialPort("COM3", {
  baudrate: 57600
}, false);

// var cmdDict = {
//   '102': '1\n4\n', //forward
//   '98': '3\n6\n',  //back
//   '114': '1\n6\n', //right
//   '108': '3\n4\n', //left
//   '115': '2\n5\n'  //stop
// };

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('command', function(cmd) {
    console.log(cmd);
    var portwrite;
    if (cmd === 102) {
      portwrite = '1\n4\n';
    } else if (cmd === 98) {
      portwrite = '3\n6\n';
    } else if (cmd === 108) {
      portwrite = '1\n6\n';
    } else if (cmd === 114) {
      portwrite = '3\n4\n';
    } else if (cmd === 115) {
      portwrite = '2\n5\n';
    } else {
      portwrite = '2\n5\n';
    }
    
    serialPort.open(function(err) {
      if (err) {
        console.log(err);
      }
      console.log('opened');
      serialPort.write(portwrite, function(err, results) {
        console.log('written');
        if (err) {
          console.log(err);
        }
        serialPort.close(function(err) {
          if (err) {
            console.log(err);
          }
        });
      });
    });    
  });

  socket.on('disconnect', function() {
    console.log('a user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
