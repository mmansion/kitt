var express  = require('express')
  , nano     = require('nano')('http://localhost:5984/') 
  , dbConfig = require('../../../cyto-db/config.js')
  , colors   = require('colors')
  , api      = new express.Router()
  , db       = nano.use(dbConfig.dbName);
 
/**
 *
 * Users
 *
 */

api.route('/v1/users')

.get(function(req, res) {

  res.json({ message: 'get request received' });
})

.post(function(req, res) {

  res.json({ message: 'post request received' });
})

.put(function(req, res) {

  res.json({ message: 'put request received' });
})

.delete(function(req, res) {

  res.json({ message: 'delete request received' });
});

/**
 *
 * Sketches
 *
 */

api.route('/v1/sketches')

.get(function(req, res) {

  var data;

  db.get('sketches', function(err, body) {
    console.log(body);

    //check if _design/users view exists
    if(err && err.status_code == 404) {

      data = 404;

    } else {
      
      data = body;
    }
    
    res.json({ message: data });
  });

});


module.exports = api;