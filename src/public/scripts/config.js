require.config({
  
  baseUrl: '/scripts',

  paths: {
    jquery:     '/jquery/dist/jquery',
    highlight:  '/highlightjs/highlight.pack',
    underscore: '/underscore/underscore',
    nexus:      '/_Nexus'
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

require(['app']);