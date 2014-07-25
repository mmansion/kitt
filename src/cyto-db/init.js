var nano   = require('nano')('http://localhost:5984/') 
  , config = require('./config.js')
  , users  = require('./design-views/users.json')
  , db     = {};

var init = function () {

  console.log("initialization of database");

  //start by listing all databases
  nano.db.list(function(err, body) {

    //check for the db name specified in config
    if(body.indexOf(config.dbName) === -1) {

      //if no db, then create a new one
      nano.db.create(config.dbName, function(err, body) {
        if (!err) {
          //set nano to use the new db
          db = nano.use(config.dbName);
          addViews();
        }
      });

    } else {
      //use the existing db
      db = nano.use(config.dbName);
      addViews();
    }
  });
};

var addViews = function () {

  //add "users" view (couchdb _design doc)
  db.get('_design/users', function(err, body) {

    //check if _design/users view exists
    if(err && err.status_code == 404) {

      //restore the users view from backup
      db.insert(users, '_design/users', function(err, body) {
        if (!err) onComplete();
      });

    } else {
      onComplete();
    }
  });
}

var onComplete = function () {

  console.log(config.dbName + ' database initialization is complete');
}

module.exports = init;