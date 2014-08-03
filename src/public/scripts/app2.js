// define(['cyto','angular'], function(Cyto, angular) {

//   window.cyto = {}; //global cyto namespace


//   cyto = new Cyto(); //initialize the cyto app

//   var $html = angular.element(document.getElementsByTagName('html')[0]);

//   angular.element().ready(function() {
//     console.log("ready");
//     angular.resumeBootstrap([app['cytoApp']]);
//   });

//   return angular.module('cytoApp', [
//     'ngRoute',
//     'myApp.filters',
//     'myApp.services',
//     'myApp.directives',
//     'myApp.controllers'
//   ]);


//   //TODO: use angular to bind to cyto dom element,
//   //  and change sketch when data-sketch attribute changes

// });


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
    return angular.module('cytoApp', [
      'ngRoute',
      'cytoApp.filters',
      'cytoApp.services',
      'cytoApp.directives',
      'cytoApp.controllers'
    ]);
});