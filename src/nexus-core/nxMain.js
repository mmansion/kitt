define([

  //nexus-core

  '/nxCanvas.js',
  '/nxCoords.js',
  '/nxDrawEngine.js',
  '/nxVideo.js',
  '/nxEvents.js',
  '/nxMouse.js',
  '/nxUtils.js',

  //nexus-addons

  '/../nexus-addons/nxLeap.js'

  ], 

  function (
    canvas, 
    coords, 
    drawEngine, 
    Video,
    events,
    nxMouse,
    utils,

    nxLeap

    ) {

    /* nxMain Class
   --------------------------------------------------- */

    Nexus = function () {

      self = this;

      //provide access to objects via root

      //TODO: update for nx prefix
      self.canvas = canvas;
      self.coords = coords;
      self.engine = drawEngine;
      self.events = events;


      //TODO: all core classes should follow this pattern
      self.mouse = new nxMouse(this);

      self.Leap = nxLeap;

      //constructor classes
      self.Video  = Video;

      self.start = function (canvasElement) { //entry point for application

        var proto = Object.getPrototypeOf(self);

        self.width  = self.canvas.width  = window.innerWidth;
        self.height = self.canvas.height = window.innerHeight;

        self.canvas.element   = canvasElement;
        self.canvas.context2D = canvasElement.getContext('2d');

        //TODO:  move this?
        //var this.proto = Object.getPrototypeOf(self);

        //console.log(self.canvas.context2D);
       
        //move canvas context methods to canvas class of nexus lib
        for(obj in self.canvas.context2D) {
          var ctx = self.canvas.context2D;

          if(typeof ctx[obj] === 'function') {
            proto[obj] = ctx[obj].bind(ctx);
          } else {
            proto[obj] = ctx[obj];
          }
        }

        //console.log(proto);
        //console.log("---------------------");

        self.engine.start(canvasElement);
      }
    };

    /* nxMain Prototype
   --------------------------------------------------- */

    Nexus.prototype = {

      create: function (className) {
        console.log(className);
      },

      resize: function () {
        this.canvas.width  = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.setup();
      }
    };

    return Nexus;
});