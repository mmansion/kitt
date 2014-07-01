define(['/cyDrawingObject.js'], function (DrawingObject) {

  var Shape = function() {
    this.drawCenter = false;
  };

  var p = Shape.prototype = new DrawingObject();

  p.drawCenter = function(bool) {
    this.drawCenter = bool || true;
  };
    
  p.collidesWith = function(shape) {
      var axes = this.getAxes().concat(shape.getAxes());
      return !this.separationOnAxes(axes, shape);
  },

  p.separationOnAxes = function(axes, shape) {
      for (var i=0; i < axes.length; ++i) {
         axis = axes[i];
         projection1 = shape.project(axis);
         projection2 = this.project(axis);

         if (! projection1.overlaps(projection2)) {
            return true; // don't have to test remaining axes
         }
      }
    return false;
  };

  p.move = function(dx, dy) {
    throw 'move(dx, dy) not implemented';
  };

  p.createPath = function(context) {
  throw 'createPath(context) not implemented';
  };

  p.getAxes = function() {
    throw 'getAxes() not implemented';
  };

  p.project = function(axis) {
    throw 'project(axis) not implemented';
  };

  p.fill = function(context) {
    context.save();
    context.fillStyle = this.fillStyle;
    this.createPath(context);
    context.fill();
    context.restore();
  };

  p.stroke = function(context) {
    context.save();
    context.strokeStyle = this.strokeStyle;
    this.createPath(context);
    context.stroke();
    context.restore();
  };

  p.isPointInPath = function(context, x, y) {
  this.createPath(context);
  return context.isPointInPath(x, y);
  };

  return Shape;
});