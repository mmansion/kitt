define(function () {

  /* PRIVATE VARS
   --------------------------------------------------- */

  var _this;

  /* MY CLASS
   --------------------------------------------------- */

  var nxShape = function(root) {

    _this      = this;
    _this.root = root;

  };

  /* MY CLASS PROTOTYPE
   --------------------------------------------------- */

  nxShape.prototype = {
  
    /**
     * Draw an ellipse
     *
     * @method ellipse
     * @param x {Number}  - center x coordinate of the ellipse
     * @param y {Number}  - center y coordinate of the ellipse
     * @param w {Number}  - width of the ellipse
     * @param h {Number}  - height of the ellipse
     * @param c {Boolean} - draw from center, defaults true
     */

    ellipse: function (x, y, w, h, c) {

      if(c) {
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
    }
  };

  /* PRIVATE FUNCTIONS
   --------------------------------------------------- */
  
  function _privateFunction() {



  }

  return nxShape;
});