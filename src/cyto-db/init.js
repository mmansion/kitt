var nano   = require('nano')('http://localhost:5984/') 
  , config = require('./config.js')
  , db     = {};


var usersJson = require('./design-views/users.json');

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


function addViews() {

  //add "users" view (couchdb _design doc)

  db.get('_design/users', function(err, body) {

    //check if _design/users view exists
    if(err && err.status_code == 404) {

      //restore the users view from backup
      db.insert(usersJson, '_design/users', function(err, body) {
        if (!err)
          console.log(body);
      });

    } else {

      console.log(body);
    }

  });
}


