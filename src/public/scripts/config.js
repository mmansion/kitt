require.config({
  
  baseUrl: '/scripts',

  paths: { 

    //CYTO DEPENDENCIES

    jquery     :  '/jquery/jquery',
    highlight  : '/highlightjs/highlight.pack',
    underscore : '/underscore/underscore',
    uikit      : '/uikit/dist/js/uikit',

    //CYTO FRAMEWORK

    cyto:      '/cyMain'

  },

  shim: {
    /* 
    //example
    'library': {
      deps: ['jquery', 'modernizer', 'classie']  
      exports: 'library-name'
    }
    */

    'highlight' : {
      exports: 'hljs'
    }
  }
});

if(document.title === 'login') {
  
  require(['login']);

} else {

  require(['app2']);
}