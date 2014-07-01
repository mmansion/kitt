define([

  //Core Modules
  '/View.js',
  '/cyCoords.js',
  '/cyDrawEngine.js',
  '/cyShape.js',
  '/cyVideo.js',
  '/EventDispatcher.js',
  '/cyMouse.js',
  '/cyMath.js',
  '/cyPoint.js',
  '/cyUtils.js',
  '/cyVector.js',

  //2D Primitives
  '/cyEllipse.js',
  '/cyRectangle.js',

  //Addons
  '/../cyto-addons/cyLeap.js'

  ],

  function (

    //Core Classes
    View, 
    cyCoords, 
    cyDrawEngine, 
    cyShape,
    cyVideo,
    EventDispatcher,
    cyMouse,
    cyMath,
    cyPoint,
    cyUtils,
    cyVector,

    //2D Primitives
    cyEllipse,
    cyRectangle,

    //Addons
    cyLeap

    //TODO: cyFCB1010

    ) {

    Cyto = function () {

      this.canvasMode = '2d';

      //global properties
      this.mouseX     = 0;
      this.mouseY     = 0;

      //PRE-INSTANTIATED CORE CLASSES
      this.events = new EventDispatcher (this);
      this.coords = new cyCoords        (this);
      this.shape  = new cyShape         (this);
      this.mouse  = new cyMouse         (this);
      this.math   = new cyMath          (this);
      this.utils  = new cyUtils         (this);
      this.engine = new cyDrawEngine    (this);

      //Simle drawing api inheritances for drawing without instantiations
      var ellipse = new cyEllipse();
      this.ellipse = ellipse.ellipse.bind(ellipse);

      var rect = new cyRectangle();

      //this.rect    = Object.create(cyRectangle.prototype.rect)

      this.start = function (canvasElement) { //entry point
        _gatherAllClassMethods(this);

         //Constructor Singletons
        this.Vector   = cyVector;
        this.Video    = cyVideo;
        this.Point    = cyPoint;
        this.Ellipse  = cyEllipse;
        this.Rectange = cyRectangle;

         //ADDON CONSTRUCTOR CLASSES
        this.Leap = cyLeap;
        
        this.swapCanvas(canvasElement);

        this.refresh();
        this.engine.start(canvasElement);
      }
    };

    Cyto.prototype = new View(); //uses a single canvas view for everything

    Cyto.prototype.refresh = function() {
      this.width   = window.innerWidth;
      this.height  = window.innerHeight;
      this.centerX = this.width/2;
      this.centerY = this.height/2;
    };

    Cyto.prototype.resize = function() {
      this.refresh();
      this.setup();
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
            for(var subKey in root[key]) {
              if(typeof root[key][subKey] === 'function') {
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