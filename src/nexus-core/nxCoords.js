define(function () {

  var nxCoords = function(root) {
    //Utils Class
  };

  nxCoords.prototype = {
    windowToCanvas: function(canvas, x, y) {
      var bbox = canvas.getBoundingClientRect(); //TODO: make this a method of the canvas class
      return {x: x-bbox.left * (canvas.width / bbox.width), y: y-bbox.top * (canvas.height / bbox.height)};
    }
  };
  
  return nxCoords;

});