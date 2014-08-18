'use strict';

define([

  //amd module dependencies

  'Cyto',
  'angular',
  'filters',
  'services',
  'directives',
  'controllers',
  'angularUiRouter'

  ], function (

    //passing required modules into module function

    Cyto, 
    angular, 
    filters, 
    services, 
    directives, 
    controllers, 
    angularUiRouter) {

    // declare app-level angular module, which has additional dependencies

    var app = angular.module('cytoApp', [
      'ui.router',
      'cytoApp.filters',
      'cytoApp.services',
      'cytoApp.directives',
      'cytoApp.controllers'
    ]);

    app.run(function($rootScope, $urlRouter) {

      //instantiating cyto library
      $rootScope.cyto = new Cyto();
      $rootScope.cyto.init();
    })

    //returning app back to main
    return app;
});