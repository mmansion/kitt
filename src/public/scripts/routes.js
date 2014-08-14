'use strict';

define(['angular', 'app'], function(angular, app) {

  /* UI Router
     -------------------------------------------------- */

   var uiRouter = app.config([
    '$stateProvider',
    '$locationProvider',
    '$urlRouterProvider',

    function($stateProvider, $locationProvider, $urlRouterProvider) {

      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise('/');
    
      $stateProvider
        
      .state('ui', {
        url: '/',
        templateUrl: '/ui/main',
        //controller: 'EditorCtrl'
      })

      .state('ui.editor', {
        templateUrl: '/ui/editor',
          //controller: 'EditorCtrl'
      })

  }]);

});