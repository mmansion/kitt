define(function () {

   /* CANVAS CLASS
   --------------------------------------------------- */

  var Canvas = function() {
    var self = this;
    
    //public properties

    self.width;
    self.height;
    self.context2D;
  };

  /* CANVAS PROTOTYPE
   --------------------------------------------------- */

  Canvas.prototype = {

    background: function(color) {

      this.context2D.save(); //save the context on a stack

      c.fillStyle = '#011722'; //TODO: make configurable
      c.fillRect(0, 0, nexus.canvas.width, nexus.canvas.height);  // now fill the canvas

      this.context2D.restore();

    }
  
  
  };
  
  return new Canvas();
});


 var my_controller = new Leap.Controller({enableGestures: true});

  my_controller.on('connect', function(){
    setInterval(function(){
      var frame = my_controller.frame();
    }, 500);
  });

  my_controller.connect();