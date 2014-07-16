/*
 * Cyto User Authentication
 */

var express = require('express')
  , auth    = new express.Router()
  , nano    = require('nano')('http://localhost:5984/') 
  , cytodb  = nano.use('cytodb')
  ;

/* Top-level middleware for every users request
   -------------------------------------------------- */

auth.use(function(req, res, next) {

  console.log("auth request received");

  // log each request to the console
  console.log(req.method, req.url);

  // continue doing what we were doing and go to the route
  next(); 
});

/* Core Views / Pages
   -------------------------------------------------- */

auth.route('/')

.get(function(req, res) {

  res.json({ message: 'get request received' });
})

.post(function(req, res) {

  var data = req.body;

  cytodb.get('users', function(err, doc) {
    if(!err) {
      if(doc.hasOwnProperty(data.username)) {
        if(doc[data.username].password === data.password) {
          res.json({ status: '200', message: 'username and password accepted' });
        } else {
          res.json({ status: '401', message: 'invalid password' });
        }
      } else {
        res.json({ status: '404', message: 'username not found' });
      }
    } else {
      res.json({ status: '505', message: 'database error' });
    }
  });
});

function errorHandler(err) {
  if(err) {
    console.log('error:', err.status_code, err.request.uri);
  }
}


module.exports = auth;