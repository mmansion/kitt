define(['/cyDrawingObject.js', '/cyUtils.js'], function (DrawingObject, utils) {

  var cyGrid = function(options) {
    
    this.root = utils.getRootInstance();

    this.strokeStyle = (options && options.strokeStyle) ? options.strokeStyle : '#fff';
    this.fillStyle   = (options && options.fillStyle)   ? options.fillStyle   : '#000';
    this.lineWidth   = (options && options.lineWidth)   ? options.lineWidth   : .5;

    //expose public methods
    this.draw = this._drawGrid;

    this._hasStroke   = true;
    this._hasFill     = false;

    //links 'this' to canvas 2D drawing api
    this._bindToView();
    //this._registerEvents();
  };

  var p = cyGrid.prototype = new DrawingObject();

  p._drawGrid = function (stepx, stepy) {
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

    //why doesn't the lineWidth property of this get picked up?
    this.root.lineWidth = this.lineWidth;

     for (var i = stepx + 0.5; i < this.canvas.width; i += stepx) {
        this.beginPath();
        this.moveTo(i, 0);
        this.lineTo(i, this.canvas.height);
        this.stroke();
        this.clearPath();
     }

     for (var i = stepy + 0.5; i < this.canvas.height; i += stepy) {
        this.beginPath();
        this.moveTo(0, i);
        this.lineTo(this.canvas.width, i);
        this.stroke();
        this.clearPath();
     }
    this.restore();
  };

  return cyGrid;
});