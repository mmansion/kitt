require([
  'jquery',
  'underscore', 
  'classes/DrawEngine2', 
  'classes/Utils'
  ], 

function($, _, DrawEngine, utils) {
  
  window.utils = utils;

  /* Sketch Vars
    --------------------------------------------------- */

  var 

  canvas  = document.getElementById('sketch'),
  sketch  = new DrawEngine(canvas),
  c       = canvas.getContext('2d'),

  lastRun   = + new Date,
  delay     = 100;

  /* Setup
    --------------------------------------------------- */

  sketch.setup = function() {

    canvas.width  = $(window).width();
    canvas.height = $(window).height();

  };

  /* Update
    --------------------------------------------------- */
  sketch.update = function() {

  };

  /* Draw (main loop)
    --------------------------------------------------- */
  sketch.draw = function(time) {
    
    
    if( + new Date - lastRun > delay) {
      lastRun = + new Date;      
    }

  };

  sketch.start();

});