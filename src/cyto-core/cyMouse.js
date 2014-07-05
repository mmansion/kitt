/**
 * @class:  cyMouse
 * @author: Mikhail Mansion
 */

define([ 
//module imports
'cyCoords.js'
], 

function (Coords) {

  //constructor

  var cyMouse = function(root) {

    this.root    = root;
    this._mouseX = 10;
    this._mouseY = 10;

    this.coords = Object.create(Coords.prototype);

    window.onmousemove = this._mouseMove.bind(this);

    this.root.view;

    //this.root.events.apply(this); //add this class to the events class (dispatcher)
  };

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