/**
 * @class:  cyMouse
 * @author: Mikhail Mansion
 */

define( function () {

   /* cyMouse Class
   --------------------------------------------------- */

  var cyMouse = function(root) {
    var self = this;

    self.root = root;
    self.x    = 0;
    self.y    = 0;
    
    window.onmousemove = self.handleMouseMove.bind(this);
    window.onmousedown = self.handleMouseDown.bind(this);
    window.onmouseup   = self.handleMouseUp.bind(this);

    root.events.apply(self); //add this class to the events class (dispatcher)
  };

  /* cyMouse Prototype
   --------------------------------------------------- */

  cyMouse.prototype = {

    getCoords: function(x, y) {
      return this.root.coords.windowToCanvas(this.root.canvas, x, y);
    },

    handleMouseMove: function(e) {
      var c = this.getCoords(e.clientX, e.clientY);

      this.root.mouseX = this.x = c.x;
      this.root.mouseY = this.y = c.y;

      this.dispatchEvent({type: 'mouseMove', message: {x: c.x, y: c.y} });
    },

    handleMouseDown: function(e) {
      var c = this.getCoords(e.clientX, e.clientY);

      this.dispatchEvent({type: 'mouseDown', message: {x: c.x, y: c.y}  });
    },

    handleMouseUp: function(e) {
      var c = this.getCoords(e.clientX, e.clientY);
      
      this.dispatchEvent({type: 'mouseUp', message: {x: c.x, y: c.y} });
    }
  };
  
  return cyMouse;

});