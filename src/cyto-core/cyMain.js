define([

  //cyto-core

  '/cyCanvas.js',
  '/cyCoords.js',
  '/cyDrawEngine.js',
  '/cyShape.js',
  '/cyVideo.js',
  '/cyEvents.js',
  '/cyMouse.js',
  '/cyMath.js',
  '/cyUtils.js',

  //cyto-addons

  '/../cyto-addons/cyLeap.js'

  ],

  function (

    //cy-core

    cyCanvas, 
    cyCoords, 
    cyDrawEngine, 
    cyShape,
    Video,
    cyEvents,
    cyMouse,
    cyMath,
    cyUtils,

    //cy-addons

    cyLeap
    //TODO: cyFCB1010

    ) {

    var _this
      , _proto;

    /* cyMain Class
      --------------------------------------------------- */

    Cyto = function () {

      _this = this;

      _this.canvasMode = '2d';

      //global properties
      _this.mouseX     = 0;
      _this.mouseY     = 0;

      //PRE-INSTANTIATED CORE CLASSES
      _this.events = new cyEvents     (this);
      _this.coords = new cyCoords     (this);
      _this.shape  = new cyShape      (this);
      _this.mouse  = new cyMouse      (this);
      _this.math   = new cyMath       (this);
      _this.utils  = new cyUtils      (this);
      _this.engine = new cyDrawEngine (this);

      //CORE CONSTRUCTOR CLASSES
      _this.Video  = Video;

      //ADDON CONSTRUCTOR CLASSES
      _this.Leap = cyLeap;

      _proto = Object.getPrototypeOf(_this);

      _this.start = function (canvasElement) { //entry point for app

        _this.swapCanvas(canvasElement);

        //_gatherDrawingContextMethods(_this); //DEPRECATED
        _gatherAllClassMethods(_this);

        _this.refresh();
        _this.engine.start(canvasElement);
      }
    };

    /* cyMain Prototype
      --------------------------------------------------- */

    Cyto.prototype = new cyCanvas();

    Cyto.prototype.refresh = function() {
      _this.width  = window.innerWidth;
      _this.height = window.innerHeight;

      _this.centerX = _this.width/2;
      _this.centerY = _this.height/2;
    };

    Cyto.prototype.resize = function() {
      _this.refresh();
      _this.setup();
    };

    /* cyMain Private Functions
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

    return Cyto;
});