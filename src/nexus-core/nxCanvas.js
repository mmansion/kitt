define(function () {

   /* nxCanvas Class
   --------------------------------------------------- */

  var nxCanvas = function(root) {
    var self = this;
    
    //public properties

    self.width = 0;
    self.height = 0;
    self.context2D;

  };

  /* nxCanvas Prototype
   --------------------------------------------------- */

  nxCanvas.prototype = {

    background: function(c) {

      var color = c || '#011722';

      this.context2D.save(); //save the context on a stack

      c.fillStyle = color; //TODO: make configurable
      c.fillRect(0, 0, nexus.canvas.width, nexus.canvas.height);  // now fill the canvas

      this.context2D.restore();
    },

    bg: function(c) {
      this.background(c);
    }
  
  
  };
  
  return nxCanvas;
});