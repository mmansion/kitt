var express    = require('express')
  , bodyParser = require('body-parser')
  , osc        = require('osc-min')
  , path       = require('path')
  , app        = express()
  , server     = require('http').createServer(app)
  , udp        = require('dgram').createSocket('udp4', onRequest_OSC)
  , io         = require('socket.io').listen(server)
  , fs         = require('fs');

  require('../cyto-db/init')();


module.exports = {

  start: function(root) {
    
    udp.bind("9999");

    //set the server port
    app.set('port',  process.env.PORT || 3333);

    //setup view directories
    app.set('views',     path.join(root, 'views'));
    app.locals.basedir = path.join(root, 'views');

    app.set('view engine', 'jade');

    /*
    Note that the use of express.bodyParser() is not recommended.

    app.use(express.bodyParser());
    ...is equivalent to:

    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.multipart());
    */

    app.use(bodyParser.json());
    
    //app.use(express.favicon());
    //app.use(express.logger('dev'));
    //app.use(express.json());
    //app.use(express.urlencoded());
    //app.use(express.methodOverride());

    //static routes
    app.use(express.static(path.join(root, '/')));
    app.use(express.static(path.join(root, '/../bower_components')));
    app.use(express.static(path.join(root, 'cyto-core')));
    app.use(express.static(path.join(root, 'cyto-db')));

    app.use(express.static(path.join(root, 'sketches')));
    app.use(express.static(path.join(root, 'public')));

    app.get('/sketch', function(req, res) {
      res.render('sketch', {title: 'cyto 001'});
    });

    // DEFAULT ROUTES
    app.use('/', require('./router'));

    // API V1 ROUTES
    app.use('/api', require('./api/v1'));

    // AUTH ROUTE
    app.use('/auth', require('./auth'));

    server.listen(app.get('port'), function(){
      console.log('Cyto Server listening on port ' + app.get('port'));
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