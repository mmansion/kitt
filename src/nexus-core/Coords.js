define(function () {

  var Coords = function() {
    //Utils Class
  };

  Coords.prototype = {
    windowToCanvas: function(canvas, x, y) {
      var bbox = nexus.canvas.element.getBoundingClientRect(); //TODO: make this a method of the canvas class
      return {x: x-bbox.left * (canvas.width / bbox.width), y: y-bbox.top * (canvas.height / bbox.height)};
    }
  };
  
  return new Coords;

});