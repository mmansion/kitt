var express = require('express')
  , osc     = require('osc-min')
  , path    = require('path')
  , routes  = require('./../routes')
  , app     = express()
  , server  = require('http').createServer(app)
  , udp     = require('dgram').createSocket('udp4', onRequest_OSC)
  , io      = require('socket.io').listen(server)
  , fs      = require('fs');

module.exports = {

  start: function(root) {
    
    udp.bind("9999");

    // all environments
    app.set('port',  process.env.PORT || 3333);
    app.set('views', path.join(root, 'views'));
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(app.router);

    //static routes
    app.use(express.static(path.join(root, '/')));
    app.use(express.static(path.join(root, 'nexus-core')));
    app.use(express.static(path.join(root, 'sketches')));
    app.use(express.static(path.join(root, 'public')));
    app.use(express.static(path.join(root, '/../bower_components')));

    // development only
    if ('development' == app.get('env')) {
      app.use(express.errorHandler());
    }

    app.get('/', routes.index);

    server.listen(app.get('port'), function(){
      console.log('http server listening on port ' + app.get('port'));
    });
  }
};

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


