/*
 * Nexus App Routes
 */

var express = require('express')
  , router  = new express.Router();
 

/**
 *
 * Used for every request
 *
 */

router.use(function(req, res, next) {

  // log each request to the console
  console.log(req.method, req.url);

  // continue doing what we were doing and go to the route
  next(); 
});


router.get('/', function(req, res) {
  res.render('index', {title: 'nexus 001'});
});

/* Nexus Widgets
   -------------------------------------------------- */

router.get('/widgets/timeline', function(req, res) {
  res.render('widgets/timeline');
});



module.exports = router;