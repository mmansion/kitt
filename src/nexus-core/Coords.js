define(function () {

  var Coords = function() {
    //Utils Class
  };

  Coords.prototype = {
    windowToCanvas: function(canvas, x, y) {
      var bbox = canvas.getBoundingClientRect();
      return {x: x-bbox.left * (canvas.width / bbox.width), y: y-bbox.top * (canvas.height / bbox.height)};
    }
  };
  
  return new Coords;

});