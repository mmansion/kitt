define(['/cyDrawingObject.js', '/cyUtils.js'], function (DrawingObject, utils) {

  var cyGrid = function(options) {
    
    this.root = utils.getRootInstance();

    this.strokeStyle = this._strokeStyle = (options && options.strokeStyle) ? options.strokeStyle : '#fff';
    this.fillStyle   = this._fillStyle   = (options && options.fillStyle)   ? options.fillStyle   : '#000';
    this.lineWidth   = this._lineWidth   = (options && options.lineWidth)   ? options.lineWidth   : .5;

    this._x      = (options && options.x)      ? options.x      : 0;
    this._y      = (options && options.y)      ? options.y      : 0;
    this._width  = (options && options.width)  ? options.width  : this.root.canvas.width;
    this._height = (options && options.height) ? options.height : this.root.canvas.height;
    this._stepX  = (options && options.stepX)  ? options.stepX  : 20;
    this._stepY  = (options && options.stepY)  ? options.stepY  : 20;

    //expose public methods
    this.draw = this._drawGrid;

    //links 'this' to canvas 2D drawing api
    this._bindToView();
  };

  var p = cyGrid.prototype = new DrawingObject();

  p._drawGrid = function (x, y, width, height, stepX, stepY) {
    var x      = x      || this._x
      , y      = y      || this._y
      , width  = width  || this._width
      , height = height || this._height
      , stepX  = stepX  || this._stepX
      , stepY  = stepY  || this._stepY;

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

    this.rect(x, y, width, height);

    for (var i = stepX + 0.5; i < width; i += stepX) {
      this.beginPath();
      this.moveTo(x + i, y);
      this.lineTo(x + i, height + y);
      this.stroke();
      this.clearPath();
    }

    for (var i = stepY + 0.5; i < height; i += stepY) {
      this.beginPath();
      this.moveTo(x, i + y);
      this.lineTo(width + x, i + y);
      this.stroke();
      this.clearPath();
    }
    this.restore();
  };

  return cyGrid;
});