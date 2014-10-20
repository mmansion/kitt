//static routes
var path     = require('path');
var express  = require('express');

module.exports = function(root, app) {

  //static routes
  app.use(express.static(path.join(root, '/')));
  app.use(express.static(path.join(root, '/../bower_components')));
  app.use(express.static(path.join(root, 'sandbox')));
  app.use(express.static(path.join(root, 'cyto-core')));
  app.use(express.static(path.join(root, 'cyto-db')));
  app.use(express.static(path.join(root, 'cyto-ui')));

  app.use(express.static(path.join(root, 'sketches')));
  app.use(express.static(path.join(root, 'cyto-app')));
};