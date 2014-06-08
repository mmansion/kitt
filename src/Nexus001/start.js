var httpServer = require('http').createServer(onRequest_HTTP)
  , udp  = require('dgram').createSocket('udp4', onRequest_OSC)
  , osc  = require('osc-min')
  , io   = require('socket.io').listen(httpServer)
  , fs   = require('fs');

var _socketIo;

httpServer.listen(9000);
udp.bind("9999");

function onRequest_HTTP(req, res) {
  fs.readFile(__dirname + '/index.html',

  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}

function onRequest_OSC(msg, rinfo) {
  var error;
  try {
    _socketIo.emit('pedalEvent', osc.fromBuffer(msg));
    return console.log(osc.fromBuffer(msg));
  } catch (_error) {
    error = _error;
    return console.log("invalid OSC packet");
  }
}

io.sockets.on('connection', function (socket) {
  _socketIo = socket;

  socket.emit('connected', 'connected');
  socket.on('browserEvent', function (data) {
    //message from the browser
  });
});

