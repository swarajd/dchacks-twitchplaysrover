var socket = io();

$(window).keypress(function(e) {
  var cmd = e.which;
  console.log(cmd);
  socket.emit('command', cmd);
});