'use strict';

require.config({
  
  baseUrl: '/scripts',

  paths: { 

    //CYTO APP

    /*
    note: bower_components already included in server static paths
      so there is no need to specify the directory here */

    /*
    for using angular ui route see:
    http://scotch.io/tutorials/javascript/angular-routing-using-ui-router
    */

    angular         : '/angular/angular',
    angularRoute    : '/angular-route/angular-route',
    angularUiRouter : '/angular-ui-router/release/angular-ui-router',
    angularMocks    : 'angular-mocks/angular-mocks',
    codemirror      : '/codemirror/lib/codemirror', 
    jquery          : '/jquery/jquery',
    highlight       : '/highlightjs/highlight.pack',
    underscore      : '/underscore/underscore',
    uikit           : '/uikit/dist/js/uikit',

    //CYTO LIBRARY

    Cyto      : '/cyMain',

    //CYTO UI

    cyEditor : '/cyEditor'
  },

  shim: {
    angular         : { exports : 'angular' } ,
    angularRoute    : [ 'angular' ],
    angularUiRouter : [ 'angular' ],
    angularMocks    : { deps:['angular'], exports: 'angular.mock' },
    codemirror      : { exports : 'CodeMirror' },
    highlight       : { exports : 'hljs' }
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
    'routes'

    ], function(angular, app, routes) {

      angular.element().ready(function () {
        
        angular.resumeBootstrap([app.name]);
      });
  });
}