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
      //self.canvas = new nxCanvas     (this);
      self.mouse  = new nxMouse      (this);
      self.utils  = new nxUtils      (this);
      self.engine = new nxDrawEngine (this);

      //CORE CONSTRUCTOR CLASSES
      self.Video  = Video;

      //ADDON CONSTRUCTOR CLASSES
      self.Leap = nxLeap;

      _proto = Object.getPrototypeOf(self);

      self.start = function (canvasElement) { //entry point for app

        self.swapCanvas(canvasElement);

        //_gatherDrawingContextMethods(self); //DEPRECATED
        _gatherAllClassMethods(self);

        self.refresh();
        self.engine.start(canvasElement);
      }
    };

    /* nxMain Prototype
      --------------------------------------------------- */

    Nexus.prototype = new nxCanvas();

    Nexus.prototype.refresh = function() {
      this.width  = window.innerWidth;
      this.height = window.innerHeight;

      this.centerX = this.width/2;
      this.centerY = this.height/2;
    };

    Nexus.prototype.resize = function() {
      this.refresh();
      this.setup();
    };

    /* nxMain Private Functions
      --------------------------------------------------- */

    function _gatherDrawingContextMethods(root) { //DEPRECATED
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
            console.log("reset");
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
              if(typeof root[key][subKey] === 'function') {
                //bind proper context for functions
                root[subKey] = root[key][subKey].bind(root[key]);
              } else {
                root[subKey] = root[key][subKey];
              }
            }
          }
        }
      }
    }

    return Nexus;
});