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

    //nx-core

    nxCanvas, 
    nxCoords, 
    nxDrawEngine, 
    Video,
    nxEvents,
    nxMouse,
    nxUtils,

    //nx-addons

    nxLeap
    //TODO: nxFCB1010

    ) {

    /* nxMain Class
      --------------------------------------------------- */

    Nexus = function () {

      self = this;

      self.mouseX = 0;
      self.mouseY = 0;

   
      //PRE-INSTANTIATED CORE CLASSES

      //TODO: all core classes that get instantiated automatically should follow this pattern
      self.coords = new nxCoords     (this);
      self.canvas = new nxCanvas     (this);
      self.mouse  = new nxMouse      (this);
      self.utils  = new nxUtils      (this);
      self.engine = new nxDrawEngine (this);
      self.events = new nxEvents     (this);

      self.Leap = nxLeap;

      //constructor classes
      self.Video  = Video;


      self.start = function (canvasElement) { //entry point for application


        console.log(self.utils.getObjectSize(self));

        console.log(self);

        return;

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

        //TRANSFER PROTO METHODS FROM CANVAS TO NEXUS MAIN
        console.log("---------------------------------------");
        for(obj in self.canvas) {
          if(self.canvas.hasOwnProperty(obj)) {
            console.log(obj);
          }
        }

        //console.log(Object.getPrototypeOf(self.canvas));

        for(obj in Object.getPrototypeOf(self.canvas)) {
          console.log(obj);
        }

        console.log("---------------------------------------");


        console.log(proto);
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