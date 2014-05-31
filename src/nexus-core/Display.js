define(function () {

  var Display = function() {

    //creates a new display, attached to a canvas
    //a display uses one or more canvases
    this.make = function(canvas) {
      this.canvas = canvas;
    };
  };

  Display.prototype = {

  };
  
  return new Display();
});