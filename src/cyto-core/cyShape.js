define(function () {

  //shape should be the base class for drawing 2d primitives
  //more complex forms can inherit shape's properties and methods

  /* cyShape Private Vars
   --------------------------------------------------- */

  var _this,

      //private flags
      _drawFromCenter = false;

  /* cyShape Constructor
   --------------------------------------------------- */

  var cyShape = function(root) {

    _this      = this;
    _this.root = root;
  };

  /* cyShape Prototype
   --------------------------------------------------- */

  cyShape.prototype = {

    drawCenter: function(bool) {
      _drawFromCenter = bool || true;
    },
  
    /**
     * Draw an ellipse
     *
     * @method ellipse
     * @param x {Number}  - center x coordinate of the ellipse
     * @param y {Number}  - center y coordinate of the ellipse
     * @param w {Number}  - width of the ellipse
     * @param h {Number}  - height of the ellipse
     */

    ellipse: function (x, y, w, h) {

      if(_drawFromCenter) {
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

      _this.root.beginPath();
      _this.root.moveTo(x, ym);
      _this.root.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
      _this.root.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
      _this.root.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
      _this.root.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    },

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

    rect: function(x, y, w, h, r) {
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
    }
  };

  return cyShape;
});