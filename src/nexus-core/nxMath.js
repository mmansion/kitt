
define(function () {

  /* PRIVATE VARS
   --------------------------------------------------- */

  var _this;

  _this.currentRandom = Math.random;

  /* MY CLASS
   --------------------------------------------------- */

  var nxMath = function(root) {

    _this      = this;
    _this.root = root;

    //properties, getters, setters

  };

  /* MY CLASS PROTOTYPE
   --------------------------------------------------- */

  nxMath.prototype = {
    
    random: function() {
      if(arguments.length === 0) {
        return currentRandom();
      }
      if(arguments.length === 1) {
        return currentRandom() * arguments[0];
      }
      var aMin = arguments[0], aMax = arguments[1];
      return currentRandom() * (aMax - aMin) + aMin;
    }
  };

  /* PRIVATE FUNCTIONS
   --------------------------------------------------- */

  return nxMath;
});