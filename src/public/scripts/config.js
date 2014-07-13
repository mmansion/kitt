require.config({
  
  baseUrl: '/scripts',

  paths: { 

    //NEXUS DEPENDENCIES

    jquery     :   '/jquery/jquery',
    highlight  :  '/highlightjs/highlight.pack',
    underscore : '/underscore/underscore',
    uikit      : '/uikit/dist/js/uikit',

    //NEXUS FRAMEWORK

    cyto:      '/cyMain'

    //NEXUS ADDON DEPENDENCIES

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