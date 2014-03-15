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
  delay     = 100,

  clockwise = true,
  radStart  = 0,
  radEnd    = 0,

  deg = 0;

  /* Setup
    --------------------------------------------------- */

  sketch.setup = function() {

    canvas.width  = $(window).width();
    canvas.height = $(window).height();

    c.strokeStyle = '#fff';
    c.fillStyle = '#fff';

  };

  /* Update
    --------------------------------------------------- */
  sketch.update = function() {

  };

  /* Draw (main loop)
    --------------------------------------------------- */
  sketch.draw = function(time) {
    
    deg++;

    if(deg == 360) {
      deg = 1;
      clockwise = !clockwise;
    }
    

    radStart = deg * (Math.PI/180);

    c.beginPath();

    //context.arc(x,y,r,sAngle,eAngle,counterclockwise)
    c.arc(canvas.width/2, canvas.height/2, 90,  radStart, Math.PI*2,  clockwise);
    c.arc(canvas.width/2, canvas.height/2, 70,  radStart, Math.PI*2,  clockwise);
    c.arc(canvas.width/2, canvas.height/2, 50,  radStart, Math.PI*2,  clockwise);
    c.arc(canvas.width/2, canvas.height/2, 30,  radStart, Math.PI*2,  clockwise);
    c.arc(canvas.width/2, canvas.height/2, 10,  radStart, Math.PI*2,  clockwise);

    c.stroke();
    
    if( + new Date - lastRun > delay) {
      lastRun = + new Date;
    }

  };

  function calcWave(inc) {
    var freq = 0.01,
        amp  = 200;
    return Math.sin(freq*inc) * amp;
  };


  function drawHand(loc, isHour) {
   var angle = (Math.PI*2) * (loc/60) - Math.PI/2,
       handRadius = isHour ? RADIUS - HAND_TRUNCATION-HOUR_HAND_TRUNCATION 
                           : RADIUS - HAND_TRUNCATION;

   context.moveTo(canvas.width/2, canvas.height/2);
   context.lineTo(canvas.width/2  + Math.cos(angle)*handRadius, 
                  canvas.height/2 + Math.sin(angle)*handRadius);
   context.stroke();
};

  sketch.start();

});