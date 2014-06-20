define(function () {

   /* DRAW ENGINE CLASS
   --------------------------------------------------- */

  var nxDrawEngine = function(options) {
    var self = this;

    self.options = options || {};

    self.start =  function(canvas, setFrameRate) {
      this.frameRate = setFrameRate || false;
      this.canvas    = canvas;
      this.context   = canvas.getContext('2d');
      this.lastRun   = getTimeNow();
      this.frameRate = false;
      this.fps       = 0;

      nexus.events.apply(this); //add this class to the events dispatcher

      //TODO: figure out how to use an inheritance model to make this more modular
      if(nexus.setup && typeof(nexus.setup) === 'function') {
        nexus.setup();
      }

      self.animationId = window.requestAnimationFrame(function(time) {       
        self.animate.call(self, time); // self is the game
      });
    };
  };

  /* DRAW ENGINE PROTOTYPE
   --------------------------------------------------- */

  nxDrawEngine.prototype = {
    
    animate: function (time) {
      var self = this; // window.requestNextAnimationFrame() called by DOMWindow

      self.time = time;
      self.calcFps(time); // update fps time
        
      //if an update function has been registered, call it for each animation loop
      if(nexus.update && typeof(nexus.update) === 'function') {
        nexus.update();

        self.dispatchEvent({type: 'update', message: ''}); //emit update event
      }

      //if a draw function has been registered, call it for each animation loop
      if(nexus.draw && typeof(nexus.draw) === 'function') {
        
        if(self.options.clearTransforms)  { //DEPRECATED: TODO: move to canvas class
          self.context.setTransform(1, 0, 0, 1, 0, 0); //remove translations/transforms by seting to identity matrix
        }

        if(self.options.clearBackground)  { //DEPRECATED: TODO: move to canvas class
          self.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        
        nexus.draw(time);
      }

      if(self.frameRate) { //if specifying a framerate, don't use rAF
        setTimeout(function() {

          time = getTimeNow() + 1000/self.frameRate; //next scheduled cycle
          self.animate.call(self, time);

        }, 1000/self.frameRate);

      } else { //rAF is locked to monitor's sync, typically 60 Hz, so we can't adjust the FPS for it in itself 

        //requestionAnimationFrame() callback routine must itself call requestAnimationFrame() 
        //in order to animate another frame at the next repaint.
        self.animationId = window.requestAnimationFrame(function(time) {
          self.animate.call(self, time);
        });
      }
    },

    calcFps: function (time) {
      //calculates fps by taking frame delta, and then rounds to the nearest hundreth
       this.fps = Math.round(1 / ((getTimeNow() - this.lastRun) / 1000) * 100) / 100;
       this.lastRun = getTimeNow();
    },

    getFps: function () {
      return this.fps;
    },

    getTime: function() {
      return this.time;
    },

    delay: function(ms) {
      //TODO
    }
  };

   /* PRIVATE FUNCTIONS
   --------------------------------------------------- */

  var getTimeNow = function () {
    return new Date().getTime();
  };  
  
  return nxDrawEngine;
});