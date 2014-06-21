define( function () {

   /* nxMouse Class
   --------------------------------------------------- */

  var nxMouse = function(root) {
    var self = this;

    //public properties
    self.x = 0;
    self.y = 0;

    console.log("HERE");
    
    window.onmousemove = function(e) {
      console.log(root.canvas);
      console.log("--");
      return;
      var _coords = root.coords.windowToCanvas(root.canvas, e.clientX, e.clientY);

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