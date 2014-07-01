define(['/View.js', '/cyShape.js'], function (View, Shape) {

  /**
   * Creates an Ellipse object
   *
   * @constructor Ellipse
   * 
   * @param options   {Object}  - configuration options for ellipse object
   * @param options.x {Number}  - center x coordinate of the ellipse
   * @param options.y {Number}  - center y coordinate of the ellipse
   * @param options.w {Number}  - width of the ellipse
   * @param options.h {Number}  - height of the ellipse
   */

  var Ellipse = {};

  var Ellipse = function(options) {

    //inheritance
    this.shape   = Object.create(Shape.prototype);
    this.context = Object.create(View.prototype);

    this.x          = (options && options.x)          ? options.x          : 0;
    this.y          = (options && options.y)          ? options.y          : 0;
    this.width      = (options && options.width)      ? options.width      : 10;
    this.height     = (options && options.height)     ? options.height     : 10;
    this.drawCenter = (options && options.drawCenter) ? options.drawCenter : this.shape.drawCenter;

    this.topLeft;
    this.center;
    this.radius;
  };


  Ellipse.prototype = {

    draw: function() {
      this.ellipse(this.x, this.y, this.width, this.height);
    },

    ellipse: function (x, y, w, h) {

      if(this.drawCenter) {
        x = x - w / 2.0;
        y = y - h / 2.0;
      }

      var kappa = .5522848
        , ox = (w / 2) * kappa // control point offset horizontal
        , oy = (h / 2) * kappa // control point offset vertical
        , xe = x + w           // x-end
        , ye = y + h           // y-end
        , xm = x + w / 2       // x-middle
        , ym = y + h / 2       // y-middle
        ;


      if(this.context.hasFill) {
        this.context.fill();
      }
      
      if(this.context.hasStroke) {
        this.context.stroke();
      }

      this.context.beginPath();
      this.context.moveTo(x, ym);
      this.context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
      this.context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
      this.context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
      this.context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    }
  }

  return Ellipse;
});