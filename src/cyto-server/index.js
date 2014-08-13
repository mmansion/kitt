var signature  = require('./signature')
  //, config     = require('./')
  , express    = require('express')
  , bodyParser = require('body-parser')
  , colors     = require('colors')
  //, osc        = require('osc-min')
  , path       = require('path')
  , app        = express()
  , server     = require('http').createServer(app)
  //, udp        = require('dgram').createSocket('udp4', onRequest_OSC)
  //, io         = require('socket.io').listen(server)
  , fs         = require('fs')
  , out        = fs.openSync('./out.log', 'a')
  , err        = fs.openSync('./out.log', 'a')
  , spawn      = require('child_process').spawn
  , dbPort     = 5984
  , workers    = [];

var killWorkers = function() {
  workers.forEach(function(worker) { 
    process.kill(worker); 
  });
  process.exit(0);
};

process.on("uncaughtException", killWorkers);
process.on("SIGINT",  killWorkers);
process.on("SIGTERM", killWorkers);

//-------------------------------------------------------

partials = require('./routes/partials').partials;
ui = require('./routes/ui').ui;

module.exports = {

  start: function(root) {
    
    var couchdb = spawn('couchdb', [], { detached: true, customFds: [-1, -1, -1] });

    workers.push(couchdb.pid);

    couchdb.stdout.on('data', function (data) { // register one or more handlers

      if(data.toString().search(dbPort) != -1) {

        console.log('   info  - '.cyan + 'starting process for couchdb: pid = ' + couchdb.pid);

        require('../cyto-db/index')(function() {

          //TODO: udp.bind("9999");

          //set the server port
          app.set('port',  process.env.PORT || 3333);

          //setup view directories
          app.set('views',     path.join(root, 'views'));
          app.locals.basedir = path.join(root, 'views');

          //set view engine
          app.set('view engine', 'jade');

          app.use(bodyParser.json());

          //static routes
          require('./routes/static')(root, app);

          //default routes
          app.use('/', require('./routes/default'));

          //api v1
          app.use('/api', require('./routes/api/v1'));

          //auth
          //app.use('/auth', require('./routes/auth'));

          //app.use('/partials', require('./routes/partials'));

          //app.get('/partials/name', partials.name);

          app.get('/partials/:name', partials);
          app.get('/ui/:name', ui);

          server.listen(app.get('port'), function(){
            console.log('   info  - '.cyan + 'cyto server listening on port ' + app.get('port'));
          });

        });
      }
    });

    // couchdb.stdout.on('exit', function () {    // register one or more handlers
    //   console.log("exit");
    // });

    // couchdb.stderr.on('data', function (data) {
    //   console.log('stderr: ' + data);
    // });
    
  }
};

//TODO:

// function onRequest_OSC(msg, rinfo) {
//   var error;

//   try {
//     _socketIo.emit('pedalEvent', osc.fromBuffer(msg));
//     return console.log(osc.fromBuffer(msg));
//   } catch (_error) {
//     error = _error;
//     return console.log("invalid OSC packet");
//   }
// }

// io.sockets.on('connection', function (socket) {
//   _socketIo = socket;

//   socket.emit('connected', 'connected');
  
//   socket.on('browserEvent', function (data) {
//     //message from the browser
//   });

// });