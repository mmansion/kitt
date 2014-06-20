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

    console.log("Instantiated nxMouse");
    console.log(root);

    //nexus.engine.addEventListener('update', _updateImageData.bind(this));
  };

  /* nxMouse Prototype
   --------------------------------------------------- */

  nxMouse.prototype = {

    
  
  };
  
  return nxMouse;

});