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
      var ctx      = root.canvas.getContext()
        , ctxProto = Object.getPrototypeOf(ctx);


      for(var key in ctx) {
        if(typeof ctx[key] === 'function') {
          root[key] = ctx[key].bind(ctx);
        }
      }

      for(var key in ctxProto) {
        if(typeof ctxProto[key] === 'function') {
          _proto[key] = ctxProto[key].bind(ctx);
        } else {
          _proto[key] = ctxProto[key];
        }
      }

      //TODO: find a better way to expose canvas api to root of main class
      //inheritance?

      root.engine.addEventListener('update', function() {
        for(var key in ctx) {
          if(ctx[key] !== root[key]) {
            ctx[key] = root[key];
          }
        }
      }.bind(root));
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