define(function () {

   /* VIDEO CLASS
   --------------------------------------------------- */

  var Video = function(path) {

    this.videoElement = {};

    if(path) this.load(path);
  };

  /* CANVAS PROTOTYPE
   --------------------------------------------------- */

  Video.prototype = {

    /**
     *
     * Draws video to the canvas
     *
     * @method Draw
     * @param x {Number} The x coordinate of the video
     * @param y {Number} The y coordinate of the video
     */

    draw: function (x, y) {
      //console.log(this.videoElement);
      //console.log(nexus);
    },

    /**
     *
     * loads a list of webm videos
     *
     * @method load
     * @param src {String} A path to a webm video file
     *
     */

    load: function (src) {

      var v = this.videoElement = document.createElement('video');

      v.setAttribute('src',   src);

      v.setAttribute('type',     'video/webm'); //webm only
      v.setAttribute('autoplay', 'autoplay');

      //browser should load the entire video when the page loads
      v.setAttribute('preload', 'auto');

      //TODO: provide class width & height config
      v.setAttribute('width',    800); //TMP
      v.setAttribute('height',   480); //TMP

      v.style.display = 'none';
      
      v.addEventListener('loadeddata', function() {
        // loaded and can now be played
        v.addEventListener('ended', function() {
          v.currentTime = 1.0;
          v.play();
        });
      }, false);

      document.body.appendChild(v);
    },

    /**
     *
     * @method getVideos
     *
     */

    getVideos: function (videos) {
      //todo
    }

  };

   /* PRIVATE FUNCTIONS
   --------------------------------------------------- */

  var getTimeNow = function () {
    return new Date().getTime();
  };
  
  return Video;
  //return new Video();
});