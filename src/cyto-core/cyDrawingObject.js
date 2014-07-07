define(['/cyConstants.js', '/cyUtils.js'], function(CONSTANTS, utils) {

  var cyDrawingObject = function() {
    
    this._dragging     = false;
    this._hasBeenDrawn = false;
  };

  var p = cyDrawingObject.prototype;

  p._bindToView = function() {
    var includesFilter = this.root.viewProperties
      , excludesFilter = this; //avoid collisions with this

    utils.bindObjects (
      Object.getPrototypeOf(this), 
      this.root, 
      includesFilter,
      excludesFilter
    );
  };

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

  return cyDrawingObject;
});