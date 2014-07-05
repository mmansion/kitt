define(['/cyShape.js'], function (Shape) {

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

  Shape.call(this); // call super constructor.

  this.x          = (options && options.x)          ? options.x          : 0;
  this.y          = (options && options.y)          ? options.y          : 0;
  this.width      = (options && options.width)      ? options.width      : 10;
  this.height     = (options && options.height)     ? options.height     : 10;
  this.drawCenter = (options && options.drawCenter) ? options.drawCenter : false;
  this.radius     = (options && options.radius)     ? options.radius     : 0;

  this.topLeft;
  this.center;

  //public methods reserved for instantiated class objects

  this.draw = this._draw;
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

  p._draw = function() {
    if(this instanceof cyRectangle) {
    this.rec(this.x, this.y, this.width, this.height, this.radius)
    }
  }

  return cyRectangle;
});