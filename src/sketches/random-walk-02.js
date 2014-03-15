require([
  'jquery',
  'underscore', 
  'classes/DrawEngine2', 
  'classes/Utils'
  ], 

function($, _, DrawEngine, utils) {

  /* Random Walk JS */

  window.utils = utils;

  /* Sketch Vars
    --------------------------------------------------- */

  var 

  canvas  = document.getElementById('sketch'),
  sketch  = new DrawEngine(canvas),
  c       = canvas.getContext('2d'),

  top, btm;

  /* Setup
    --------------------------------------------------- */

  sketch.setup = function() {

    canvas.width  = $(window).width();
    canvas.height = $(window).height();

    //init arrays with int zero for all values
    btm = _.range(20).map(function () { return 0 });
    top = _.range(20).map(function () { return 0 });
  };

  /* Update
    --------------------------------------------------- */
  sketch.update = function() {


  };

  /* Draw (main loop)
    --------------------------------------------------- */
  sketch.draw = function(time) {

    var topIx = Math.floor(Math.random() * top.length);
    var btmIx = Math.floor(Math.random() * btm.length);

    top[topIx]++;
    btm[btmIx]++;
    
    topWidth = canvas.width/top.length;
    btmWidth = canvas.width/btm.length;

    for(var x = 0; x < top.length; x++) {
      c.fillRect(x*topWidth, 0, topWidth-1, top[x]);
      c.fillStyle = '#fff';
      c.fill();
    }

    for(var x = 0; x < btm.length; x++) {
      c.fillRect(x*btmWidth, canvas.height-btm[x], btmWidth-1, btm[x]);
      c.fillStyle = '#fff';
      c.fill();
    }

  };

  sketch.start();

});