'use strict';

define(['angular', 'app'], function(angular, app) {

  /* View Router
     -------------------------------------------------- */

  // var viewRouter = app.config([

  //   '$routeProvider',
  //   '$locationProvider',

  //   function($routeProvider, $locationProvider) {

  //   //prevents hash in url
  //   //$locationProvider.html5Mode(true);

  //   $routeProvider

  //   .when('/view1', {
  //     templateUrl: '/partials/partial1',
  //     controller: 'MyCtrl1'
  //   })

  //   .when('/view2', {
  //     templateUrl: '/partials/partial2',
  //     controller: 'MyCtrl2'
  //   })
  
  //   .otherwise({redirectTo: '/view1'});
    
  // }]);

  /* UI Router
     -------------------------------------------------- */

   var uiRouter = app.config([

    '$stateProvider',
    '$urlRouterProvider',

    function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/home');
    
      $stateProvider
        
      .state('home', {
          url: '/home',
          templateUrl: '/partials/partial1'
      })
        
      .state('about', {
        // we'll get to this in a bit       
      });
    
  }]);

});