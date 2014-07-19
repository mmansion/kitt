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
  console.log('TODO: load login page');
  //require login page
} else {
  //load the app
  require(['app']);
}