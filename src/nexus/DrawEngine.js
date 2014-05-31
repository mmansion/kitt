define(function () {

  //private
  var _onDraw;

   /* DRAW ENGINE CLASS
   --------------------------------------------------- */

  var DrawEngine = function() {

    // Time
    this.startTime = 0;
    this.lastTime  = 0;
    this.currTime  = 0;
    this.fps = 0;
    this.STARTING_FPS = 60;

   this.start =  function(callback) {
      var self = this;               // The this variable is the game
      
      self.startTime = getTimeNow(); // Record game's startTime (used for pausing)

      _onDraw = callback; //localize the specified draw function

      /**
       *
       * @method window.requestAnimationFrame()
       *
       * tells the browser that you wish to perform an animation and requests that
       * the browser call a specified function to update an animation before next repaint
       */

      window.requestAnimationFrame(function(time) { 
        console.log("starting to draw engine");        
        self.draw.call(self, time); // self is the game
      });
    };
  };

  /* DRAW ENGINE PROTOTYPE
   --------------------------------------------------- */

  DrawEngine.prototype = {

    draw: function (time, callback) {

      var self = this; // window.requestNextAnimationFrame() called by DOMWindow
            
        self.tick(time); // Update fps, game time


        if(_onDraw && typeof(_onDraw) === 'function') {
          //calls a the function specified at start(), passing the current time as an argument
          _onDraw(time);
        }

        //Note: requestionAnimationFrame() callback routine must itself 
        //call requestAnimationFrame() if you want to animate another frame at the next repaint.
        window.requestAnimationFrame(function(time) {
          self.draw.call(self, time);
        });
      },

      // Update the frame rate, time, and the last time the application
      // drew an animation frame.
      
      tick: function (time) {
         this.updateFrameRate(time);
         this.currTime = (getTimeNow()) - this.startTime;
      },

      // Update the frame rate, based on the amount of time it took
      // for the last animation frame only.
      
      updateFrameRate: function (time) {
         if (this.lastTime === 0) this.fps = this.STARTING_FPS;
         else                     this.fps = 1000 / (time - this.lastTime);
      }
   };

   /* PRIVATE FUNCTIONS
   --------------------------------------------------- */

   var getTimeNow = function () {
      return new Date().getTime();
   };
  
  return DrawEngine;
});