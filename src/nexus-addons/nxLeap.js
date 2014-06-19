require.config({

  /**
   * nxLeap Addon Dependencies
   */

  paths: 

  { 
    leapjs: '/leapjs/leap-0.6.0' //bower_component
  },

  /**
   * nxLeap Addon Shims 
   * 
   * Shims are requires for libraries 
   * not pre-configured as AMD modules
   */

  shim: 

  { 
    'leapjs' : { exports: 'Leap' }
  }

});

define(['leapjs'], function (Leap) {

   /* nxLeap Class
   --------------------------------------------------- */

  var nxLeap = function(options) {

    var self = this;

    self.controller = new Leap.Controller({
      enableGestures: true
    });
    
    self.controller.on('connect', function() {

      //TODO: handle connection errors/timeouts/etc
      console.log("Leap device connected");
    });

    self.controller.connect();
  };

  /* nxLeap Prototype
   --------------------------------------------------- */

  nxLeap.prototype = {

    getFrame: function() {
      return this.controller.frame();
    }

  };

  return nxLeap;

});