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
    this._scale  = (options && options.scale)  ? options.scale  : 1;
    this._stepX  = (options && options.stepX)  ? options.stepX  : 20;
    this._stepY  = (options && options.stepY)  ? options.stepY  : 20;

    this._cells  = [];

    //expose public methods
    this.draw = this._drawGrid;

    //links 'this' to canvas 2D drawing api
    this._bindToView();
  };

  var p = cyGrid.prototype = new DrawingObject();

  //currently only works with non-remainder integer divisions of rows and columns; no fractions
  //TODO: handle fractions in grid size calculations

  p._drawGrid = function (x, y, width, height, stepX, stepY) {
    var x      = x      || this._x
      , y      = y      || this._y
      , width  = width  || this._width
      , height = height || this._height
      , stepX  = stepX  || this._stepX
      , stepY  = stepY  || this._stepY
      , rows   = width/stepX
      , cols   = height/stepY

      console.log(rows, cols);

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

    this.scale(this._scale, this._scale);

    this.rect(x, y, width, height);

    for (var i = stepX + this.lineWidth; i < width; i += stepX) {
      this.beginPath();
      this.moveTo(x + i, y);
      this.lineTo(x + i, height + y);
      this.stroke();
      this.clearPath();
    }

    for (var i = stepY + this.lineWidth; i < height; i += stepY) {
      this.beginPath();
      this.moveTo(x, i + y);
      this.lineTo(width + x, i + y);
      this.stroke();
      this.clearPath();
    }

    console.log(this._cells);

    this.restore();
  };

  return cyGrid;
});