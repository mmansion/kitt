'use strict';

define([

  'angular',
  'filters',
  'services',
  'directives',
  'controllers',
  'angularRoute',

  ], function (angular, filters, services, directives, controllers) {


    // Declare app level module which depends on filters, and services

    var cytoApp = angular.module('cytoApp', [
      'ngRoute',
      'cytoApp.filters',
      'cytoApp.services',
      'cytoApp.directives',
      'cytoApp.controllers'
    ]);

    return cytoApp;
});