/**
 * Module dependencies.
 */

var express = require('express')
  , app     = express()
  , routes  = require('./routes')
  , server  = require('http').createServer(app)
  , path    = require('path')
  , udp     = require('dgram').createSocket('udp4', onRequest_OSC)
  , osc     = require('osc-min')
  , io      = require('socket.io').listen(server)
  , fs      = require('fs');


udp.bind("9999");

// all environments
app.set('port', process.env.PORT || 3333);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'cyto-app')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

server.listen(app.get('port'), function(){
  console.log('http server listening on port ' + app.get('port'));
});

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
