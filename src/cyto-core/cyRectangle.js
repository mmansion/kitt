define(['/cyShape.js'], function (Shape) {

  /**
   * Creates an Rectangle object
   *
   * @constructor Ellipse
   * 
   * @param options   {Object}  - configuration options for ellipse object
   * @param options.x {Number}  - center x coordinate of the ellipse
   * @param options.y {Number}  - center y coordinate of the ellipse
   * @param options.w {Number}  - width of the ellipse
   * @param options.h {Number}  - height of the ellipse
   */

  var Rectangle = function(options) {

    this.x      = options.x || 0;
    this.y      = options.y || 0;
    this.width  = options.w || 0;
    this.height = options.h || 0;

    this.topLeft;
    this.center;
    this.radius;

    this.drawCenter = options.drawCenter || false;

    this.inherits = Object.create(Shape.prototype);

    //console.log(this.inherits);

    return this;
  };

  Rectangle.draw = function () {
    this.rect(this.x, this.y, this.width, this.height, this.radius);
  };

  //Rectangle.prototype = Shape.prototype; //inheritance

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

  Rectangle.prototype.rect = function (x, y, w, h, r) {
    r = r || 0;

    if(_drawFromCenter) {
      x = x - w / 2.0;
      y = y - h / 2.0;
    }

    _this.root.beginPath();
    _this.root.moveTo(x + r, y);
    _this.root.lineTo(x + w - r, y);
    _this.root.quadraticCurveTo(x + w, y, x + w, y + r);
    _this.root.lineTo(x + w, y + h - r);
    _this.root.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    _this.root.lineTo(x + r, y + h);
    _this.root.quadraticCurveTo(x, y + h, x, y + h - r);
    _this.root.lineTo(x, y + r);
    _this.root.quadraticCurveTo(x, y, x + r, y);
    _this.root.closePath();


    _this.root.stroke();
    _this.root.fill();
  };

  // console.log(Rectangle.prototype);
  // console.log(Shape.prototype);

  // console.log("-------------");

  return Rectangle;
});