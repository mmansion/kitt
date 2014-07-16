// var nano     = require('nano')('http://localhost:5984')
//   , username = 'user'
//   , userpass = 'pass'
//   , callback = console.log // this would normally be some callback
//   , cookies  = {} // store cookies, normally redis or something
//   ;

// nano.auth(username, userpass, function (err, body, headers) {
//   if (err) {
//     return callback(err);
//   }

//   if (headers && headers['set-cookie']) {
//     cookies[user] = headers['set-cookie'];
//   }

//   callback(null, "it worked");
// });

/*
 * Cyto App Routes
 */

var express = require('express')
  , auth    = new express.Router()
  , nano    = require('nano')('http://localhost:5984/') 
  , db      = nano.db.get('cytodb', errorHandler);
 
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

  res.json({ message: 'post request received' });
});

function errorHandler(err) {
  if(err) {
    console.log('error:', err.status_code, err.request.uri);
  }
}


module.exports = auth;