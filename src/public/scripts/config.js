require.config({
  
  baseUrl: '/scripts',

  paths: { 

    //CYTO DEPENDENCIES
    angular    : '/angular/angular',
    jquery     : '/jquery/jquery',
    highlight  : '/highlightjs/highlight.pack',
    underscore : '/underscore/underscore',
    uikit      : '/uikit/dist/js/uikit',

    //CYTO FRAMEWORK

    cyto:      '/cyMain'
  },

  shim: {
    'angular'   : { exports : 'angular'},
    'highlight' : { exports : 'hljs'}
  }
});

if(document.title === 'login') {
  
  require(['login']);

} else {

  require(['app2']);
}