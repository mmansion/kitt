'use strict';

define(['angular', 'services', 'Cyto'], function(angular, services) {

  /* Directives */

  angular.module('cytoApp.directives', ['cytoApp.services'])


    .directive('appVersion', ['version', function(version) {
      return function(scope, elm, attrs) {
        elm.text(version);
      };
    }])

    .directive('myDirective', function() {
      return {
        restrict: 'E',
        scope: {
           current: '=current'
        },
        templateUrl: 'myDirective.html',
        controller: function($scope) {
          //controller for sub area.
        }
      };
    });

});

//TODO:
//http://stackoverflow.com/questions/12863663/angularjs-complex-nesting-of-partials-and-templates