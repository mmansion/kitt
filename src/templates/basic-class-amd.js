define(function () {

  /* PRIVATE VARS
   --------------------------------------------------- */

  var _private = "private variable";

  /* MY CLASS
   --------------------------------------------------- */

  var MyClass = function() {
    //properties, getters, setters

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

  return new MyClass();
});