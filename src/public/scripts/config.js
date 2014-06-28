require.config({
  
  baseUrl: '/scripts',

  paths: { 

    //NEXUS DEPENDENCIES

    jquery:     '/jquery/dist/jquery',
    highlight:  '/highlightjs/highlight.pack',
    underscore: '/underscore/underscore',

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

require(['app']);