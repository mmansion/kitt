require.config({
  baseUrl: './',
  paths: {
    jquery: 'vendor/jquery.min',
    modernizer: 'vendor/modernizr.min',
    mlpushmenu: 'vendor/multi-menu/js/mlpushmenu',
    classie: 'vendor/multi-menu/js/classie',
    highlight: 'vendor/highlight/highlight.pack',
    underscore: '../bower_components/underscore/underscore',
    kitt: 'kitt/kitt'
  },
  shim: {
    'mlpushmenu': {
      deps: ['jquery', 'modernizer', 'classie']    
    }
  }
});
require(['app']);