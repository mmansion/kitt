define(function () {

   /* VIDEO CLASS
   --------------------------------------------------- */

   //uses .webm 
   //Support for WebM is available natively in Chrome,

  var Video = function(path) {

    console.log("instantiating new video");

    if(path) this.load(path);
  };

  /* CANVAS PROTOTYPE
   --------------------------------------------------- */

  Video.prototype = {

    /**
     *
     * loads a list of webm videos
     *
     * @method loadVideos
     * @param {Array} A list of video sources
     *
     */

    load: function (src) {

      var v = document.createElement('video');

      v.setAttribute('src',   src);

      v.setAttribute('type', 'video/webm');
      //v.setAttribute('type', 'video/mp4');

      v.setAttribute('autoplay', "autoplay");

      //e.setAttribute('controls', 'false');
      //v.setAttribute('loop', 'true');

      //browser should load the entire video when the page loads
      v.setAttribute('preload', 'auto');

      v.setAttribute('width', 800);
      v.setAttribute('height', 480);

      

      //e.removeAttribute('controls');
      

      v.addEventListener('loadeddata', function() {
    
        // Video is loaded and can be played
        v.addEventListener('ended', function() {

          //alert("HI");
          //v.load();
          v.currentTime = 1.0;
          //alert(v.currentTime);
          // console.log(v.currentTime);
          // v.play();
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