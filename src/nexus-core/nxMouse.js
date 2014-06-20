define( function () {

   /* nxMouse Class
   --------------------------------------------------- */

  var nxMouse = function(root) {
    var self = this;

    //public properties
    self.x = 0;
    self.y = 0;
    
    window.onmousemove = function(e) {
      var _coords = nexus.coords.windowToCanvas(nexus.canvas, e.clientX, e.clientY);

      root.mouseX  = self.x = _coords.x;
      root.mouseY  = self.y = _coords.y;
    }
  };

  /* nxMouse Prototype
   --------------------------------------------------- */

  nxMouse.prototype = {

    
  
  };
  
  return nxMouse;

});