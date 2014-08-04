'use strict';

define([

  'Cyto',
  'angular',
  'filters',
  'services',
  'directives',
  'controllers',
  'angularRoute',

  ], function (Cyto, angular, filters, services, directives, controllers) {

    // Declare app-level module which depends on filters, and services

    var app = angular.module('cytoApp', [
      'ngRoute',
      'cytoApp.filters',
      'cytoApp.services',
      'cytoApp.directives',
      'cytoApp.controllers'
    ]);

    app.cyto = new Cyto(); //initialize the cyto app

    return app;
});