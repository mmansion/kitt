define(['/cyConstants.js', '/cyUtils.js'], function(CONSTANTS, utils) {

  var cyDrawingObject = function() {
    
    this._dragging     = false;
    this._hasBeenDrawn = false;

    Object.defineProperty(this, 'y', {
      get: function()  { return this._y },
      set: function(y) { 
        this._y  = y;  
        this.top = this._y; 
        this.bottom = this._y + this._height;
      }
    });

    Object.defineProperty(this, 'x', {
      get: function()  { return this._x },
      set: function(x) { 
        this._x = x;  
        this.left = this._x;
        this.right  = this._x + this._width;
      }
    });

    Object.defineProperty(this, 'width', {
      get: function()  { return this._width; },
      set: function(w) { this._width = w;    }
    });

    Object.defineProperty(this, 'height', {
      get: function()  { return this._height; },
      set: function(h) { this._height = h;    }
    });

    Object.defineProperty(this, 'lineWidth', {
      get: function()  { return this._lineWidth; },
      set: function(w) { //core view context property
        this._lineWidth = this.root.lineWidth = w;
      }
    });

    Object.defineProperty(this, 'fillStyle', {
      get: function()  { return this._fillStyle; },
      set: function(c) { //core view context property
        this._fillStyle = this.root.fillStyle = c;
      }
    });

    Object.defineProperty(this, 'strokeStyle', {
      get: function()  { return this._strokeStyle; },
      set: function(c) { //core view context property
        this._strokeStyle = this.root.strokeStyle = c;
      }
    });
  };

  var p = cyDrawingObject.prototype;

  p._bindToView = function() {
    var includesFilter = this.root.viewProperties
      , excludesFilter = this; //avoid collisions with this

    utils.bindObjects (
      this, 
      this.root, 
      includesFilter,
      excludesFilter
    );
  };

  return cyDrawingObject;
});