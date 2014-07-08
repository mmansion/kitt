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

  return cyDrawingObject;
});