define(['/cyShape.js', '/cyUtils.js'], function (Shape, utils) {

  /**
   * Creates an Rectangle object
   *
   * @constructor Ellipse
   * 
   * @param options        {Object}  - configuration options for ellipse object
   * @param options.x      {Number}  - center x coordinate of the ellipse
   * @param options.y      {Number}  - center y coordinate of the ellipse
   * @param options.width  {Number}  - width of the ellipse
   * @param options.height {Number}  - height of the ellipse
   */

  var cyRectangle = function(options) {

    this.root = utils.getRootInstance();

    if(!this.root) return this; //don't run constructor if root not instantiated

    // set constructor options

    this.drawCenter  = (options && options.drawCenter)  ? options.drawCenter  : false;
    this.radius      = (options && options.radius)      ? options.radius      : 0;
    this.strokeStyle = (options && options.strokeStyle) ? options.strokeStyle : '#fff';
    this.fillStyle   = (options && options.fillStyle)   ? options.fillStyle   : '#000';
    this.draggable   = (options && options.draggable)   ? true                : false;

    //private properties

    this._width      = (options && options.width)      ? options.width      : 100;
    this._height     = (options && options.height)     ? options.height     : 100;

    this._x = (options && options.x) ? (this.drawCenter) ?
              options.x - this._width / 2 : options.x : 
              (this.drawCenter) ? - this._width/2 : 0;

    this._y = (options && options.y) ? (this.drawCenter) ?
              options.y - this._height / 2 : options.y : 
              (this.drawCenter) ? - this._height/2 : 0;

    this._hasFill    = (options && options.fillStyle);
    this._hasStroke  = true;
    this._dragging   = false;

    this._hasBeenDrawn   = false;

    this.top    = this._y;
    this.bottom = this._y + this._height;
    this.left   = this._x;
    this.right  = this._x + this._width;

    //getters + setters

    Object.defineProperty(this, 'y', {
      get: function()  { return this._y },
      set: function(y) { 
        this._y  = y;  
        this.top = this._y; 
        this.bottom = this._y + this._height;
      }
    });

    Object.defineProperty(this, 'x', {
      get: function()  { return this._x },
      set: function(x) { 
        this._x = x;  
        this.left = this._x;
        this.right  = this._x + this._width;
      }
    });

    Object.defineProperty(this, 'width', {
      get: function()  { return this._width; },
      set: function(w) { this._width = w;    }
    });

    Object.defineProperty(this, 'height', {
      get: function()  { return this._height; },
      set: function(h) { this._height = h;    }
    });

    //link canvas 2D drawing api to prototype

    var includesFilter = this.root.viewProperties
      , excludesFilter = this; //avoid collisions with this

    utils.bindObjects (
      Object.getPrototypeOf(this), 
      this.root, 
      includesFilter,
      excludesFilter
    );
    
    //public methods reserved for instantiated class objects
    this.draw = this._draw;

    this._registerEvents();
  };

  var p = cyRectangle.prototype = new Shape();

  /* public methods
     -------------------------------------------------- */
  /**
  * Draws a rectangle using the current state of the canvas. 
  * By providing a fifth r argument a corner radius can be specified
  *
  * @param {CanvasRenderingContext2D} ctx
  * @param {Number} x The top left x coordinate
  * @param {Number} y The top left y coordinate 
  * @param {Number} width The width of the rectangle 
  * @param {Number} height The height of the rectangle
  * @param r {Number} radius The corner radius. Defaults to 5;
  * @param {Boolean} fill Whether to fill the rectangle. Defaults to false.
  * @param {Boolean} stroke Whether to stroke the rectangle. Defaults to true.
  */

  p.rect = function (x, y, w, h, r) {
    r = r || 0;

    if(this.drawCenter) {
      x = x - w / 2.0;
      y = y - h / 2.0;
    }

    this.beginPath();
    this.moveTo(x + r, y);
    this.lineTo(x + w - r, y);
    this.quadraticCurveTo(x + w, y, x + w, y + r);
    this.lineTo(x + w, y + h - r);
    this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    this.lineTo(x + r, y + h);
    this.quadraticCurveTo(x, y + h, x, y + h - r);
    this.lineTo(x, y + r);
    this.quadraticCurveTo(x, y, x + r, y);
    this.closePath();

    this.stroke();
    this.fill();
    this.clearPath();
  };

  /* private functions
     -------------------------------------------------- */
  p._registerEvents = function () {
    //hook into the root's mouse events
    this.root.on('mouseMove', this._mouseMove.bind(this));
    this.root.on('mouseDown', this._mouseDown.bind(this));
    this.root.on('mouseUp',   this._mouseUp.bind(this));
  };

  p._mouseDown = function (e) {
    if(e.x > this.left && e.x < this.right && e.y > this.top && e.y < this.bottom) {
      if(this._hasBeenDrawn && this.draggable) this._dragging = true;
    }
  };

  p._mouseUp = function () {
    if(this.draggable) this._dragging = false;
  };

  p._mouseMove = function (e) {
    if(this._dragging) {
      this._dragging = true;
      this.x = (this.drawCenter) ? e.x - this.width / 2 : e.x;
      this.y = (this.drawCenter) ? e.y - this.height / 2 : e.y;
      this.clear();
      this.draw();
    }
  };

  p._draw = function() {
    if(!this._hasBeenDrawn) this._hasBeenDrawn = true;
    if(this instanceof cyRectangle) {
      this.save();
      if(this._hasStroke) {
        this.stroke(this.strokeStyle);
      } else {
        this.noStroke();
      }
      if(this._hasFill) {
        this.fill(this.fillStyle);
      } else {
        this.noFill();
      }
      this.rect(this.x, this.y, this.width, this.height, this.radius);
      this.restore();
    }
  }

  return cyRectangle;
});