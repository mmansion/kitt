define(function () {

  /* CONSTRUCTOR
   --------------------------------------------------- */

  var nxEvents = function() {};

  /* PROTOTYPE
   --------------------------------------------------- */

  nxEvents.prototype = {

    /**
     *
     * Appends the Events class prototype to a supplied class prototype
     *
     *  @param o {Object} - A classes' prototype
     *
     */

    apply: function (obj) {
      var self = this;

      obj.addEventListener    = self.addEventListener;
      obj.hasEventListener    = self.hasEventListener;
      obj.removeEventListener = self.removeEventListener;
      obj.dispatchEvent       = self.dispatchEvent;
    },

    /**
     *
     * Appends the Events class prototype to a supplied class prototype
     *
     *  @param type {String} - A class prototype
     *
     */

    addEventListener: function (type, listener) {
      var listeners;

      if(this._listeners === undefined) this._listeners = {};

      listeners = this._listeners;

      if(!listeners[type]) listeners[type] = [];
      if(listeners[type].indexOf(listener) === - 1) listeners[type].push(listener);
    },

    hasEventListener: function (type, listener) {
      if(this._listeners === undefined ) return false;

      var listeners = this._listeners;

      if (listeners[type] !== undefined && 
          listeners[type].indexOf(listener) !== - 1) {
          
        return true;
      } else {
        return false;
      }
    },

    removeEventListener: function (type, listener) {
      if(this._listeners === undefined ) return;

      var listeners = this._listeners;
      var listenerArray = listeners[ type ];

      if(listenerArray !== undefined ) {
        var index = listenerArray.indexOf( listener );

        if(index !== - 1) {
          listenerArray.splice( index, 1 );
        }
      }
    },

    dispatchEvent: function (event) {
      if (this._listeners === undefined) return;
      
      var listeners = this._listeners;
      var listenerArray = listeners[ event.type ];

      if ( listenerArray !== undefined ) {
        var array = [];
        var length = listenerArray.length;

        event.target = this;

        for ( var i = 0; i < length; i ++ ) {
          array[ i ] = listenerArray[ i ];
        }
        for ( var i = 0; i < length; i ++ ) {
          array[ i ].call( this, event );
        }
      }
    }
  };

  return nxEvents;
});

/**
 *
 * @credits: mr doob, mozilla
 *
 */