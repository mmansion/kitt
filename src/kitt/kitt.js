define([
  '/src/kitt/Coords.js',
  '/src/kitt/DrawEngine3.js',
  '/src/kitt/Utils.js'
  ], 
  function(coords, drawEngine, utils) {

    return Kitt = function() {
      console.log("new kitt created");

      var self = this;

      self.name =  'kitt';
      self.canvas = {};
      self.engine = drawEngine;

      self.start = function(canvas) {
        self.canvas = canvas;
        self.engine.start(canvas);
      }
      return self;
    };

    // return kitt = {
    //   Kitt: function() {
    //     var self = this;

    //     console.log(self);

    //     // return {
    //     //   self.name:   'kitt',
    //     //   self.canvas: {},
    //     //   self.engine: drawEngine,

    //     //   self.start:  function() {
    //     //     self.canvas = canvas;
    //     //     self.drawEngine.start(canvas);
    //     //   };
    //     // }
    //   }
    // };


  // return kitt = {
    
  //   name: 'kitt',
  //   canvas: {},
  //   drawEngine: drawEngine,

  //   start: function(canvas) {
  //     this.canvas = canvas;
  //     this.drawEngine.start(canvas);
  //   }
  // };
});