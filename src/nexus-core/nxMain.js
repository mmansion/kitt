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

      self.coords = new nxCoords     (this);
      self.canvas = new nxCanvas     (this);
      self.mouse  = new nxMouse      (this);
      self.utils  = new nxUtils      (this);
      self.engine = new nxDrawEngine (this);
      self.events = new nxEvents     (this);

      //CORE CONSTRUCTOR CLASSES
      self.Video  = Video;

      //ADDON CONSTRUCTOR CLASSES
      self.Leap = nxLeap;

      self.start = function (canvasElement) { //entry point for application

        var proto = Object.getPrototypeOf(self);

        //self.width  = 
        self.canvas.width  = window.innerWidth;
        
        //self.height = 
        self.canvas.height = window.innerHeight;

        self.canvas.element   = canvasElement;
        self.canvas.context2D = canvasElement.getContext('2d');

        //TODO:  move this?
        //var this.proto = Object.getPrototypeOf(self);

        //console.log(self.canvas.context2D);
       
        //move canvas context methods to canvas class of nexus lib
        // for(obj in self.canvas.context2D) {
        //   var ctx = self.canvas.context2D;

        //   if(typeof ctx[obj] === 'function') {
        //     proto[obj] = ctx[obj].bind(ctx);
        //   } else {
        //     proto[obj] = ctx[obj];
        //   }
        // }

        self.engine.start(canvasElement);


        gatherAllClassMethods(self);
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

    /**
     *
     * Gathers all sub-class methods and makes them callable from the main class
     *
     * @method gatherAllClassMethods
     */

    function gatherAllClassMethods(root) {

      for(var key in root) {

        if(root.hasOwnProperty(key)) { //look for classes assigned to root

          if(typeof root[key] === 'object') {
            //var proto = Object.getPrototypeOf(root[key]);

            for(var subKey in root[key]) {
              root[subKey] = root[key][subKey];
            }
          }
        }
      }
    }

    return Nexus;
});