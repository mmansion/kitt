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
        controller: function(scope) {
          //controller for sub area.
        }
      };
    })

    /*
    This directive allows us to pass a function in on an enter key to do what we want.
    */

    .directive('ngEnter', function () {
      return function (scope, element, attr) {
        element.bind('keydown keypress', function (event) {
          
          if(event.which === 13) {

            //clear selection
            if(document.selection && typeof(document.selection.empty) == 'function') {
              document.selection.empty();
            } else {
              window.getSelection().removeAllRanges();
            }

            scope.$apply(attr.ngEnter); 
            // scope.$apply(function (event) {
            //     scope.$eval(attr.ngEnter);
            // });
            event.preventDefault();
          }
        });
      };
    });


});

//TODO:
//http://stackoverflow.com/questions/12863663/angularjs-complex-nesting-of-partials-and-templates