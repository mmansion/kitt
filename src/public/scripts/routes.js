'use strict';

define(['angular', 'app'], 

  function(angular, app) {

    var router = app.config([

      '$routeProvider',
      '$routeProvider',

      function($routeProvider) {

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

// $routeProvider.
//     when('/view1', {
//       templateUrl: 'partials/partial1',
//       controller: 'MyCtrl1'
//     }).
//     when('/view2', {
//       templateUrl: 'partials/partial2',
//       controller: 'MyCtrl2'
//     }).
//     otherwise({
//       redirectTo: '/view1'
//     });

//   $locationProvider.html5Mode(true);