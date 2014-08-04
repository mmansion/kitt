'use strict';

require.config({
  
  baseUrl: '/scripts',

  paths: { 

    //CYTO APP

    angular      : '/angular/angular',
    angularRoute : '/angular-route/angular-route',
    angularMocks : 'angular-mocks/angular-mocks',
    jquery       : '/jquery/jquery',
    highlight    : '/highlightjs/highlight.pack',
    underscore   : '/underscore/underscore',
    uikit        : '/uikit/dist/js/uikit',

    //CYTO LIBRARY

    CytoLib      : '/cyMain'
  },

  shim: {
    angular      : { exports : 'angular'},
    angularRoute : ['angular'],
    angularMocks : { deps:['angular'], exports: 'angular.mock' },
    highlight    : { exports : 'hljs'}
  }

});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

if(document.title === 'login') {
  
  require(['login']);

} else {

  require([

    'angular',
    'app',
    'routes',
    'CytoLib'

    ], function(angular, app, routes, Cyto) {

      angular.element().ready(function () {

        angular.resumeBootstrap([app.name]);

        //app.cyto = new Cyto(); //initialize the cyto app
      });
  });
}