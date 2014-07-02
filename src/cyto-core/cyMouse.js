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

    console.log(root.events);

    this.root    = root;
    this._mouseX = 10;
    this._mouseY = 10;

    this.coords = Object.create(Coords.prototype);

    //window.onmousemove = this.handleMouseMove.bind(this);
    window.onmousedown = this._handleMouseMove.bind(this);


    this.root.events.apply(this); //add this class to the events class (dispatcher)
  };

  /* Prototype inheritance
     -------------------------------------------------- */

  var p = cyMouse.prototype;

  /* Public Methods
     -------------------------------------------------- */

  p.events = ['onMouseMove', 'onMouseDown', 'onMouseUp'];

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

  p._handleMouseMove = function (e) {
    var c = this.coords.windowToCanvas(this.root.canvas, x, y);

    this.root.mouseX = this.x = c.x;
    this.root.mouseY = this.y = c.y;

    this.dispatchEvent({type: 'mouseMove', message: {x: c.x, y: c.y} });
  },

  p._handleMouseDown = function (e) {
    var c = this.coords.windowToCanvas(this.root.canvas, x, y);

    this.dispatchEvent({type: 'mouseDown', message: {x: c.x, y: c.y}  });
  },

  p._handleMouseUp = function (e) {
    var c = this.coords.windowToCanvas(this.root.canvas, x, y);
    
    this.dispatchEvent({type: 'mouseUp', message: {x: c.x, y: c.y} });
  };
  
  return cyMouse;
});