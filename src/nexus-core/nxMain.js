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

    var _proto;

    /* nxMain Class
      --------------------------------------------------- */

    Nexus = function () {

      self = this;

      self.canvasMode = '2d';

      self.mouseX = 0;
      self.mouseY = 0;

      //PRE-INSTANTIATED CORE CLASSES
      self.events = new nxEvents     (this);
      self.coords = new nxCoords     (this);
      self.canvas = new nxCanvas     (this);
      self.mouse  = new nxMouse      (this);
      self.utils  = new nxUtils      (this);
      self.engine = new nxDrawEngine (this);

      //CORE CONSTRUCTOR CLASSES
      self.Video  = Video;

      //ADDON CONSTRUCTOR CLASSES
      self.Leap = nxLeap;

      _proto = Object.getPrototypeOf(self);

      self.start = function (canvasElement) { //entry point for app

        self.canvas.element = canvasElement;

        //self.width  = 
        self.canvas.width  = window.innerWidth;
        
        //self.height = 
        self.canvas.height = window.innerHeight;        


        _gatherDrawingContextMethods(self);
        _gatherAllClassMethods(self);

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

    /* nxMain Private Functions
      --------------------------------------------------- */

    function _gatherDrawingContextMethods(root) {
      var c = root.canvas.getContext();

      for(o in c) {

        if(typeof c[o] === 'function') {
          _proto[o] = c[o].bind(c);
        } else {
          _proto[o] = c[o];
        }
      }

      console.log(_proto);
      // //self.canvas.element   = canvasElement;
      //   self.canvas.context2D = canvasElement.getContext('2d');

      // //TODO:  move this?

      //   console.log(self.canvas.context2D);
       
      //   //move canvas context methods to canvas class of nexus lib
      
    };

    /**
     * Gathers all sub-class methods and makes them callable from the main class
     *
     * @method gatherAllClassMethods
     */

    function _gatherAllClassMethods(root) {

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