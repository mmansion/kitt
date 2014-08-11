var express = require('express')
  , nano    = require('nano')('http://localhost:5984/') 
  , colors  = require('colors')
  , api     = new express.Router()
  , db      = {};
 
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

  res.json({ message: 'getting sketches' });
});


module.exports = api;