define(function () {

  //private members
  var _offscreenCanvas = {};

   /* VIDEO CLASS
   --------------------------------------------------- */

  var Video = function(path) {

    this.videoElement = {};
    this.context = nexus.canvas.context2D;

    makeOffScreenCanvas();

    nexus.engine.addEventListener('update', function() {
      //console.log("on update");
    });


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
     *
     */

    draw: function (x, y) {

      this.context.drawImage(this.videoElement, x, y);
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
      v.setAttribute('autoplay', 'autoplay'); //currently autoplays

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


      //console.log(_offscreenCanvas);
    }

  };

   /* PRIVATE FUNCTIONS
   --------------------------------------------------- */

  var getTimeNow = function () {
    return + new Date;
  };

  function makeOffScreenCanvas(width, height) {
    var _canvas = document.createElement('canvas');

    _offscreenCanvas = {
      context2D : _canvas.getContext('2d'),
      width     : nexus.canvas.width,
      height    : nexus.canvas.height
    };
  }
  
  return Video;
  //return new Video();
});