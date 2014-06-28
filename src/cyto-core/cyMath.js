
define(function () {

  /* PRIVATE VARS
   --------------------------------------------------- */

  var _this;


  /* MY CLASS
   --------------------------------------------------- */

  var cyMath = function(root) {

    _this      = this;
    _this.root = root;

    _this.random = Math.random;

  };

  /* MY CLASS PROTOTYPE
   --------------------------------------------------- */

  cyMath.prototype = {
    
    random: function() {
      if(arguments.length === 0) {
        return random();
      }
      if(arguments.length === 1) {
        return random() * arguments[0];
      }
      var aMin = arguments[0], aMax = arguments[1];
      return random() * (aMax - aMin) + aMin;
    }
  };

  /* PRIVATE FUNCTIONS
   --------------------------------------------------- */

  return cyMath;
});