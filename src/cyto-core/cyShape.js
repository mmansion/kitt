define(['/cyDrawingObject.js'], function (DrawingObject) {


  var cyShape = function(root) {

    this.root = root;

    this.drawCenter = false;

    this.inherits = Object.create(DrawingObject.prototype);

    //console.log(this.inherits);
  };

  cyShape.prototype = {

    drawCenter: function(bool) {
      console.log(drawCenter);
      this.drawCenter = bool || true;
    }
    
  };

  return cyShape;
});