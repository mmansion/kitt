define(function () {

  var _canvas  = document.createElement('canvas')
    , _context = _canvas.getContext('2d');

  //The nxCanvas class gets both the canvas api and the context api
  //both canvas/context get placed onto the nexus prototype

   /* nxCanvas Class
   --------------------------------------------------- */

  var nxCanvas = function() {
    var self  = this
       _proto = Object.getPrototypeOf(self);

    self.width   = _canvas.width;
    self.height  = _canvas.height;

    //reset nxCanvas inherited proto to the proper canvas "this" context
    for(var key in _proto) {
      if(typeof _proto[key] === 'function') {
        _proto[key] = _proto[key].bind(_context);
      }
    }

    self.swapCanvas = function (oldCanvas) {

      _canvas.setAttribute('id',     'nexus-' + oldCanvas.id);
      _canvas.setAttribute('width',  oldCanvas.width);
      _canvas.setAttribute('height', oldCanvas.height);

      oldCanvas.parentNode.replaceChild(_canvas, oldCanvas);

      self.width  = _canvas.width;
      self.height = _canvas.height;
    }

    /* nxCanvas Prototype
   --------------------------------------------------- */

    _proto.background = function(c) {
      var color = c || '#011722';

      _context.save(); //save the context on a stack
      _context.fillStyle = color; //TODO: make configurable
      _context.fillRect(0, 0, self.width, self.height);  // now fill the canvas
      _context.restore();
    };

    _proto.bg = function() {
      self.background();
    };

    _proto.getContext = function() {
      return _context;
    };
  };

  /* nxCanvas inheritance
   --------------------------------------------------- */

  nxCanvas.prototype = _canvas.getContext('2d');
  
  return nxCanvas;
});