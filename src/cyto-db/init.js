var nano   = require('nano')('http://localhost:5984/') 
  , colors = require('colors')
  , config = require('./config.js')
  , users  = require('./design-views/users.json')
  , db     = {};

var init = function (callback) {

  console.log('   info  - '.cyan + 'initilizing database');

  //start by listing all databases
  nano.db.list(function(err, body) {

    if(err) {
      console.log('   error - '.red + 'cannot connect to database');
    } else {
      //check for the db name specified in config
      if(body.indexOf(config.dbName) === -1) {

        //if no db, then create a new one
        nano.db.create(config.dbName, function(err, body) {
          if (!err) {
            //set nano to use the new db
            db = nano.use(config.dbName);
            addViews(callback);
          }
        });

      } else {
        //use the existing db
        db = nano.use(config.dbName);
        addViews(callback);
      }
    }
  });
};

var addViews = function (callback) {

  //add "users" view (couchdb _design doc)
  db.get('_design/users', function(err, body) {

    //check if _design/users view exists
    if(err && err.status_code == 404) {

      //restore the users view from backup
      db.insert(users, '_design/users', function(err, body) {
        if (!err) onComplete(callback);
      });

    } else {
      onComplete(callback);
    }
  });
}

var onComplete = function (callback) {

  console.log('   info  - '.cyan + 'database initialization is complete');
  if(callback && typeof(callback) === 'function') {
    callback();
  }
}

module.exports = init;