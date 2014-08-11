'use strict';

define([

  //requirejs module

  'Cyto',
  'angular',
  'filters',
  'services',
  'directives',
  'controllers',
  'angularRoute',
  'angularUiRouter'

  ], function (

    //passing required modules into module function

    Cyto, 
    angular, 
    filters, 
    services, 
    directives, 
    controllers, 
    angularRoute) {

    // declaring app-level angular module, which depends on filters, and services

    var app = angular.module('cytoApp', [
      'ui.router',
      'ngRoute',
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