define([

  //nexus-core

  '/nxCanvas.js',
  '/nxCoords.js',
  '/nxDrawEngine.js',
  '/nxShape.js',
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
    nxShape,
    Video,
    nxEvents,
    nxMouse,
    nxMath,
    nxUtils,

    //nx-addons

    nxLeap
    //TODO: nxFCB1010

    ) {

    var _this
      , _proto;

    /* nxMain Class
      --------------------------------------------------- */

    Nexus = function () {

      _this = this;

      _this.canvasMode = '2d';

      _this.mouseX = 0;
      _this.mouseY = 0;

      //PRE-INSTANTIATED CORE CLASSES
      _this.events = new nxEvents     (this);
      _this.coords = new nxCoords     (this);
      _this.shape  = new nxShape      (this);
      _this.mouse  = new nxMouse      (this);
      _this.math   = new nxMath       (this);
      _this.utils  = new nxUtils      (this);
      _this.engine = new nxDrawEngine (this);

      //CORE CONSTRUCTOR CLASSES
      _this.Video  = Video;

      //ADDON CONSTRUCTOR CLASSES
      _this.Leap = nxLeap;

      _proto = Object.getPrototypeOf(_this);

      _this.start = function (canvasElement) { //entry point for app

        _this.swapCanvas(canvasElement);

        //_gatherDrawingContextMethods(_this); //DEPRECATED
        _gatherAllClassMethods(_this);

        _this.refresh();
        _this.engine.start(canvasElement);
      }
    };

    /* nxMain Prototype
      --------------------------------------------------- */

    Nexus.prototype = new nxCanvas();

    Nexus.prototype.refresh = function() {
      _this.width  = window.innerWidth;
      _this.height = window.innerHeight;

      _this.centerX = _this.width/2;
      _this.centerY = _this.height/2;
    };

    Nexus.prototype.resize = function() {
      _this.refresh();
      _this.setup();
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