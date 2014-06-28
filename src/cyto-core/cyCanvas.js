define(function () {

  var _this, _proto

    , _canvas  = document.createElement('canvas')
    , _context = _canvas.getContext('2d');

    _stroke = _context.stroke.bind(_context);
    _fill   = _context.fill.bind(_context);

  //The cyCanvas class gets both the canvas api and the context api
  //both canvas/context get placed onto the cyto prototype

   /* cyCanvas Class
      --------------------------------------------------- */

  var cyCanvas = function() {

    _this  = this
    _proto = Object.getPrototypeOf(_this);

    _this.width  = _canvas.width;
    _this.height = _canvas.height;

    _this.hasStroke = true;
    _this.hasFill   = false;

    //reset cyCanvas inherited proto to the proper canvas "this" context
    for(var key in _proto) {
      if(typeof _proto[key] === 'function') {
        _proto[key] = _proto[key].bind(_context);
      }
    }

    _this.swapCanvas = function (oldCanvas) {

      _canvas.setAttribute('id', 'cyto-' + oldCanvas.id);

      _canvas.setAttribute('width',  oldCanvas.width);
      _canvas.setAttribute('height', oldCanvas.height);

      oldCanvas.parentNode.replaceChild(_canvas, oldCanvas);

      _this.width  = _canvas.width;
      _this.height = _canvas.height;
    };

    /* cyCanvas Prototype
       --------------------------------------------------- */

    _proto.background = function(c) {
      var color = c || '#011722';

      _context.save(); //save the context on a stack
      _context.fillStyle = color; //TODO: make configurable
      _context.fillRect(0, 0, _this.width, _this.height);  // now fill the canvas
      _context.restore();
    };

    _proto.bg = function() {
      _this.background();
    };

    _proto.getContext = function() {
      return _context;
    };

    _proto.stroke = function(color) {
      if(color === undefined) {
        _stroke();
      } else {
        _this.hasStroke   = true;
        _this.strokeStyle = color;
      }
    };

    _proto.noStroke = function(color) {
      _this.hasStroke   = false;
      _this.strokeStyle = 'rgba(0,0,0,0)';
    };

    _proto.fill = function(color) {
      if(color === undefined) {
        _fill();
      } else {
        _this.hasFill   = true;
        _this.fillStyle = color;
      }
    };

    _proto.noFill = function() {
      _this.hasFill   = false;
      _this.fillStyle = 'rgba(0,0,0,0)';
    };

  };

  /* cyCanvas inheritance
   --------------------------------------------------- */

  cyCanvas.prototype = _canvas.getContext('2d');
  
  return cyCanvas;
});