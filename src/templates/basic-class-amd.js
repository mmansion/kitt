define(function() {

  /* PRIVATE VARS
   --------------------------------------------------- */

  var _this;

  /* MY CLASS
   --------------------------------------------------- */

  var MyClass = function(root) {
    _this      = this;
    _this.root = root;
  };

  MyClass.someMethod = function() {

  };

  /* MY CLASS PROTOTYPE
   --------------------------------------------------- */

  MyClass.prototype = {
    
    protoMethod: function() {
      //prototype method
    }
  };

  /* PRIVATE FUNCTIONS
   --------------------------------------------------- */
  
  function _privateFunction() {

  }

  return MyClass;
});