/**
 * @class:  cyPoint
 * @author: Mikhail Mansion
 */

define(function() {

  //some point methods from paperjs
  //https://github.com/paperjs/paper.js/blob/master/src/basic/Point.js
  
  var _this;

  
  var Point = function(x, y) {
    
    _this = this;

    _this.x = x || 0;
    _this.y = y || 0;
  };

  Point.prototype = {

    set: function(x, y) {
      this.x = x;
      this.y = y;
    },

    equals: function(point) {
    return this === point || point
        && (this.x === point.x && this.y === point.y
          || Array.isArray(point)
            && this.x === point[0] && this.y === point[1])
        || false;
    },

    clone: function() {
      return new Point(this.x, this.y);
    },

    getDistance: function(/* point, squared */) {
      var point = Point.read(arguments),
        x = point.x - this.x,
        y = point.y - this.y,
        d = x * x + y * y,
        squared = Base.read(arguments);
      return squared ? d : Math.sqrt(d);
    },

    add: function(/* point */) {
      var point = Point.read(arguments);
      return new Point(this.x + point.x, this.y + point.y);
    },

    subtract: function(/* point */) {
      var point = Point.read(arguments);
      return new Point(this.x - point.x, this.y - point.y);
    },

    multiply: function(/* point */) {
      var point = Point.read(arguments);
      return new Point(this.x * point.x, this.y * point.y);
    },

    divide: function(/* point */) {
      var point = Point.read(arguments);
      return new Point(this.x / point.x, this.y / point.y);
    },

    modulo: function(/* point */) {
      var point = Point.read(arguments);
      return new Point(this.x % point.x, this.y % point.y);
    },

    isClose: function(point, tolerance) {
      return this.getDistance(point) < tolerance;
    }

  };

  return Point;

});