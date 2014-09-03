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
    angularUiRouter : '/angular-ui-router/release/angular-ui-router',
    angularMocks    : '/angular-mocks/angular-mocks',
    highlight       : '/highlightjs/highlight.pack',
    underscore      : '/underscore/underscore',
    uikit           : '/uikit/dist/js/uikit',
    cm              : '/codemirror',  //code mirror folder path

    jquery          : '/jquery/jquery',
    jqueryUi        : '/jquery-ui/jquery-ui',

    jqUiCore        : '/jquery-ui/ui/core',
    jqUiWidget      : '/jquery-ui/ui/widget',
    jqUiMouse       : '.jquery-ui/ui/mouse',
    jqUiResizable   : '/jquery-ui/ui/resizable',

    //CYTO LIBRARY

    Cyto : '/cyMain',

    //CYTO UI MODULES (exposes the ui controller class modules)

    cyEditor   : '/cyEditor',
    cyTimeline : '/cyTimeline'
  },

  shim: {
    angular         : { exports : 'angular' } ,
    angularUiRouter : [ 'angular' ],
    angularMocks    : { deps: ['angular'], exports: 'angular.mock' },
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