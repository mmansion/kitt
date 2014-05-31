define(function () {

   /* VIDEO CLASS
   --------------------------------------------------- */

  var Video = function() {
    var self = this;

    console.log("video class loaded");
  };

  /* CANVAS PROTOTYPE
   --------------------------------------------------- */

  Video.prototype = {

    /**
     *
     * @method loadVideos
     *
     */

    loadVideos: function (videos) {
      //todo
    },

    /**
     *
     * @method getVideos
     *
     */

    getVideos: function (videos) {
      //todo
    },
    
  
  };

   /* PRIVATE FUNCTIONS
   --------------------------------------------------- */

   var getTimeNow = function () {
      return new Date().getTime();
   };
  
  return new Video();
});