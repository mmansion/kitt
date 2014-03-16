define([
  '/src/kitt/Coords.js',
  '/src/kitt/DrawEngine3.js',
  '/src/kitt/Utils.js'
  ], 
  function(coords, drawEngine, utils) {

    Kitt = function() {

      this.canvas = {};
      this.coords = coords;
      this.engine = drawEngine;

      this.start = function(canvas) {

        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;

        this.canvas = canvas;
        this.engine.start(canvas);
      }
    };

    Kitt.prototype = {
      resize: function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.setup();
      }
    };

    return Kitt;
});