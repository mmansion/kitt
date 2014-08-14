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

        url   : '/',

        views : {

          // main template placed here (relatively named)
          ''  : { templateUrl: '/ui/main' },

          // child views are defined here (absolutely named)

          'editor@ui'   : { 
            templateUrl : '/ui/editor',
            controller  :  'EditorCtrl'
          },

          'timeline@ui' : { 
            templateUrl : '/ui/timeline',
            //controller  : 'TimelineCtrl'
          }
        }
      })

      //SUBVIEW FORMAT (of ui)

      // .state('ui.editor', {
      //   templateUrl: '/ui/editor',
      //     //controller: 'EditorCtrl'
      // })

  }]);
});