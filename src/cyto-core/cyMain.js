define([

  //Core Modules
  '/cyView.js',
  '/cyCoords.js',
  '/cyDrawEngine.js',
  '/cyShape.js',
  '/cyVideo.js',
  '/cyEventDispatcher.js',
  '/cyMouse.js',
  '/cyMath.js',
  '/cyPoint.js',
  '/cyUtils.js',
  '/cyVector.js',

  //2D Primitives
  '/cyEllipse.js',
  '/cyRectangle.js',
  '/Polygon.js',

  //Addons
  '/../cyto-addons/cyLeap.js'

  ],

  function (

    //Core Classes
    cyView, 
    cyCoords, 
    cyDrawEngine, 
    cyShape,
    cyVideo,
    cyEvents,
    cyMouse,
    cyMath,
    cyPoint,
    cyUtils,
    cyVector,

    //2D Primitives
    cyEllipse,
    cyRectangle,
    Polygon,

    //Addons
    cyLeap

    //TODO: cyFCB1010

    ) {

    Cyto = function () {

      this.canvasMode = '2d';

      //global properties
      // this.mouseX     = 0;
      // this.mouseY     = 0;

      //PRE-INSTANTIATED CORE CLASSES
      this.utils  = cyUtils;

      this.eventDispatcher     = new cyEvents       (this);
      this.coords     = new cyCoords       (this);
      this.shape      = new cyShape        (this);
      this.mouse      = new cyMouse        (this);
      this.math       = new cyMath         (this);
      this.engine     = new cyDrawEngine   (this);

      //Simle drawing api inheritances for drawing without instantiations
      var ellipse = new cyEllipse();
      this.ellipse = ellipse.ellipse.bind(ellipse);

      var rect = new cyRectangle();

      //this.rect    = Object.create(cyRectangle.prototype.rect)

      this.start = function (canvasElement) { //entry point

        this._gatherRootObjects(this);

        //_gatherAllClassMethods(this);

        this._registerEvents();

         //Constructor Singletons
        this.Vector   = cyVector;
        this.Video    = cyVideo;
        this.Point    = cyPoint;
        this.Ellipse  = cyEllipse;
        this.Rectange = cyRectangle;
        this.Polygon  = Polygon;

         //ADDON CONSTRUCTOR CLASSES
        this.Leap = cyLeap;
        
        this.initView(canvasElement);

        this.refresh();
        this.engine.start(canvasElement);
      }
    };

    var p = Cyto.prototype = new cyView(); //uses a single canvas view for everything

    p.refresh = function() {
      this.width   = window.innerWidth;
      this.height  = window.innerHeight;
      this.centerX = this.width/2;
      this.centerY = this.height/2;
    };

    p.resize = function() {
      this.refresh();
      this.setup();
    };

    p._eventsList = {};

    p._events = {};

    p._getEventType = function(query) {
      var eventType;

      for(var type in this._eventsList) {
        this._eventsList[type].forEach(function(e) {
          if(eventType) return; //short circuit loop if found
          if(e === query) {
            eventType = type;
          }
        });
      }
      return eventType;
    };  

    p._noop = function(){};

    p._registerEvents = function() {

      for(var type in this._eventsList) {

        this._eventsList[type].forEach(function(e) {

          p._events[e] = {};

          Object.defineProperty(p, e, {
            
            get: function() { 
              return this._events[e];  
            }.bind(this),

            set: function(handler) {
              this._events[e] = handler;
              this.on(this._events[e], handler);
            }.bind(this)

          });

          p[e] = p._noop;

        }.bind(this));
      }

    };

    p._registerGlobalEvents = function() {

    };

    p._captureEvents = function (object, events) {

      events.forEach(function(e) {

        if(!this._eventsList[object]) this._eventsList[object] = []; 

        this._eventsList[object].push(e);

      }.bind(this));
    };

    p._hasEvents = function(object) {
      return (object.events !== undefined);
    };

    p._gatherRootObjects = function () {
      var proto;

      for(var object in this) {
        if(typeof(this[object]) === 'object') {
          proto = Object.getPrototypeOf(this[object]);

          if(this._hasEvents(proto)) {
            this._captureEvents(object, proto.events);
          }
          for(var key in proto) {
            if(proto.hasOwnProperty(key) && !String(key).match(/_/)) { //if not private
              if(typeof proto[key] === 'function') {
                this[key] = proto[key];
              } else {
                this[key] = proto[key];
              }
            }
          }
        }
      }
    };

    /**
     * Gathers all sub-class methods and makes them callable from the main class
     *
     * @method gatherAllClassMethods
     */

    function _gatherAllClassMethods(root) {
      return;
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