var c;

/* Setup
  --------------------------------------------------- */
kitt.setup = function() {
  c = kitt.canvas.getContext('2d');
  addVideo();
}

/* Update
  --------------------------------------------------- */
kitt.update = function() {

}


/* Draw
  --------------------------------------------------- */
kitt.draw = function() {

}

/* Functions
  --------------------------------------------------- */
function addVideo() {

  var $video
    , videoElem;

  $video = $('<video src="sketches/data/spaceships.webm" loop="true" autoplay="true"></video>');

  $video.css({
    "width": "100%",
    "position": "relative",
    "z-index" : "-99",
    "margin": "0 auto",
    //"background": "yellow"
  });

  $('body').append($video);

  // video = $('video').get(0);

  // video.onended = function() {
  //   console.log(video.currentTime);
  //   video.currentTime = 1.0;
  //   console.log(video.currentTime);

  //   video.play();
    
  // }
  
  // video.play();

}

