/**
 * @class:  cyMouse
 * @author: Mikhail Mansion
 */

define(function() {

  var cyMouse = function() { /* no constructor */ };

  /* Prototype inheritance
     -------------------------------------------------- */
  var p = cyMouse.prototype;

  /* Public Methods
     -------------------------------------------------- */

  p.events = ['mouseMove', 'mouseDown', 'mouseUp'];

  Object.defineProperty(p, 'mouseX', {
    get: function()  { return this._mouseX },
    set: function(x) { this._mouseX = x;   }
  });

  Object.defineProperty(p, 'mouseY', {
    get: function()  { return this._mouseY },
    set: function(y) { this._mouseY = y;   }
  });

  /* Private members
     -------------------------------------------------- */
  p._mouseMove = function (e) {
    if(this.dispatchEvent) {
      this.dispatchEvent({type: 'mouseMove', message: {x: e.pageX, y: e.pageY} });
    }
  },

  p._mouseDown = function (e) {
    if(this.dispatchEvent) {
      this.dispatchEvent({type: 'mouseDown', message: {x: e.pageX, y: e.pageY} });
    }
  },

  p._mouseUp = function (e) {
    if(this.dispatchEvent) {
      this.dispatchEvent({type: 'mouseUp', message: {x: e.pageX, y: e.pageY} });
    }
  };
  
  return cyMouse;
});