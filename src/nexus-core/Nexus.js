define([

  '/Canvas.js',
  '/Coords.js',
  '/DrawEngine.js',
  '/Video.js',
  '/Utils.js'
  ], 

  function(
    canvas, 
    coords, 
    drawEngine, 
    Video, 
    utils) {

    Nexus = function() {

      self = this;

      //provide access to objects via root
      self.canvas = canvas;
      self.coords = coords;
      self.engine = drawEngine;
      
      //constructor classes
      self.Video  = Video;

      self.start = function(canvasElement) { //entry point for application

        self.canvas.width  = window.innerWidth;
        self.canvas.height = window.innerHeight;

        self.canvas.elem      = canvasElement;
        self.canvas.context2D = canvasElement.getContext('2d');
        
        self.engine.start(canvasElement);
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