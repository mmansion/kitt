/*
 * Cyto App Routes
 */

var express = require('express')
  , api     = new express.Router()
  , nano    = require('nano')('http://localhost:5984')
  ;
 
/* Top-level middleware for every api request
   -------------------------------------------------- */

api.use(function(req, res, next) {

  console.log("api request received");

  // log each request to the console
  console.log(req.method, req.url);

  // continue doing what we were doing and go to the route
  next(); 
});

/* Core Views / Pages
   -------------------------------------------------- */


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


module.exports = api;