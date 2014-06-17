define([

  '/Canvas.js',
  '/Coords.js',
  '/DrawEngine.js',
  '/Video.js',
  '/Events.js',
  '/Utils.js'
  ], 

  function(
    canvas, 
    coords, 
    drawEngine, 
    Video,
    events,
    utils) {

    Nexus = function() {

      self = this;

      //provide access to objects via root
      self.canvas = canvas;
      self.coords = coords;
      self.engine = drawEngine;
      self.events = events;
      
      //constructor classes
      self.Video  = Video;

      self.start = function(canvasElement) { //entry point for application

        self.canvas.width  = window.innerWidth;
        self.canvas.height = window.innerHeight;

        self.canvas.element   = canvasElement;
        self.canvas.context2D = canvasElement.getContext('2d');

        //TODO:  move this?
        var canvasProto = Object.getPrototypeOf(self.canvas);

        //move context methods to canvas class of nexus lib
        for(method in self.canvas.context2D) {
          canvasProto[method] = self.canvas.context2D[method];
        }

        //console.log(self.canvas);

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