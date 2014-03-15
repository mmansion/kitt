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
  delay     = 3000,
  walker;

  /* Setup
    --------------------------------------------------- */

  sketch.setup = function() {

    canvas.width  = $(window).width();
    canvas.height = $(window).height();

    walker = new Walker(c);
  };

  /* Update
    --------------------------------------------------- */
  sketch.update = function() {

  };

  /* Draw (main loop)
    --------------------------------------------------- */
  sketch.draw = function(time) {

    walker.display();
    walker.walk();

    if( + new Date - lastRun > delay) {
      lastRun = + new Date;  
      walker.anomaly();    
    }
  };


  /* Classes
    --------------------------------------------------- */

  var Walker = function(context) {
    var _x = canvas.width/2
      , _y = canvas.width/2
      , _c = context;

    _c.strokeStyle = "#fff";
    _c.beginPath();
    _c.moveTo(_x,_y);

    this.getCtx = function() {
      return _c;
    };
    this.x = function(x) {
      if(x) {
        _x = x;
      } else {
        return _x;
      }
    };
    this.y = function(y) {
      if(y) {
        _y = y;
      } else {
        return _y;
      }
    };
  }

  Walker.prototype = {
    display: function() {
      var c = this.getCtx();
      
      c.lineTo(this.x(),this.y());
      c.stroke();
    },
    walk: function() {
      this.x(this.x() + this.getRandomInt(-2,2));
      this.y(this.y() + this.getRandomInt(-2,2));
    },
    anomaly: function() {
      this.x(this.x() + this.getRandomInt(-10,10));
      this.y(this.y() + this.getRandomInt(-10,10));
    },
    getRandomInt: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  };


  sketch.start();

});