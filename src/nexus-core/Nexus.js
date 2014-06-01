define([

  '/src/nexus-core/Coords.js',
  '/src/nexus-core/DrawEngine.js',
  '/src/nexus-core/Video.js',
  '/src/nexus-core/Utils.js'
  ], 

  function(coords, drawEngine, Video, utils) {

    Nexus = function() {

      //provide access to objects via root
      this.canvas = {};
      this.coords = coords;
      this.engine = drawEngine;
      
      //constructor classes
      this.Video  = Video;

      this.start = function(canvas) {

        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;

        this.canvas = canvas;
        this.engine.start(canvas);
      }
    };

    Nexus.prototype = {

      create: function(className) {
        console.log(className);
      },

      resize: function() {
        this.canvas.width  = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.setup();
      }

    };

    return Nexus;
});