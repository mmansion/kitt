/*
 * Cyto App Routes
 */

var express = require('express')
  , router  = new express.Router();
 
/* Top-level middleware for every request
   -------------------------------------------------- */

router.use(function(req, res, next) {

  // log each request to the console
  //console.log(req.method, req.url);

  // continue doing what we were doing and go to the route
  next(); 
});

/* Core Views / Pages
   -------------------------------------------------- */

router.get('/', function(req, res) {
  res.render('screens/index', {title: 'cyto'});
});

router.get('/login', function(req, res) {
  res.render('screens/login', {
    title: 'login'
  });
});

/* Cyto UI
   -------------------------------------------------- */

router.get('/ui/dock', function(req, res) {
  res.render('ui/dock');
});

/* Cyto Widgets
   -------------------------------------------------- */

router.get('/widgets/timeline', function(req, res) {
  res.render('widgets/timeline');
});


module.exports = router;