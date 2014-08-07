'use strict';

define(['angular', 'app'], 

  function(angular, app) {

    var router = app.config([

      '$routeProvider',
      '$locationProvider',

      function($routeProvider, $locationProvider) {

      //prevents hash in url
      //$locationProvider.html5Mode(true);

      $routeProvider

      .when('/view1', {
        templateUrl: '/partials/partial1',
        controller: 'MyCtrl1'
      })

      .when('/view2', {
        templateUrl: '/partials/partial2',
        controller: 'MyCtrl2'
      })
    
      .otherwise({redirectTo: '/view1'});
    
  }]);

});