define(function () {

   /* nxCanvas Class
   --------------------------------------------------- */

  var nxCanvas = function(root) {
    var self = this;

    //public canvas properties
    self.root    = root;
    self.width   = 0;
    self.height  = 0;
    self.element = {};
  };

  /* nxCanvas Prototype
   --------------------------------------------------- */

  nxCanvas.prototype = {

    background: function(c) {
      var ctx = this.getContext();

      var color = c || '#011722';

      ctx.save(); //save the context on a stack

      ctx.fillStyle = color; //TODO: make configurable
      ctx.fillRect(0, 0, this.width, this.height);  // now fill the canvas

      ctx.restore();
    },

    bg: function(c) {
      this.background(c);
    },

    getContext: function() {
      return this.element.getContext(this.root.canvasMode);
    }
  
  };
  
  return nxCanvas;
});