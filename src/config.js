require.config({
  baseUrl: './',
  paths: {
    jquery: '/bower_components/jquery/dist/jquery',
    highlight: '/bower_components/highlightjs/highlight.pack',
    underscore: '/bower_components/underscore/underscore',
    kitt: 'kitt/kitt'
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