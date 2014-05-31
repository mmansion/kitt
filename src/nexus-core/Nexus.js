define([

  '/src/nexus-core/Coords.js',
  '/src/nexus-core/DrawEngine.js',
  '/src/nexus-core/Utils.js'
  ], 

  function(coords, drawEngine, utils) {

    Nexus = function() {

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

    Nexus.prototype = {

      resize: function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.setup();
      }

    };

    return Nexus;
});