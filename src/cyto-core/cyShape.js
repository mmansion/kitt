define(['/cyDrawingObject.js'], function (DrawingObject) {

  var Shape = function() {

    //getters + setters

  };

  var p = Shape.prototype = new DrawingObject();

  p._registerEvents = function (object) {
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

  p.isPointInPath = function(context, x, y) {
  this.createPath(context);
  return context.isPointInPath(x, y);
  };

  return Shape;
});