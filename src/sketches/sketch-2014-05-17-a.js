var c;

/* Setup
  --------------------------------------------------- */
nexus.setup = function() {
  c = nexus.canvas.getContext('2d');
  //addVideo();
}

/* Update
  --------------------------------------------------- */
nexus.update = function() {

}


/* Draw
  --------------------------------------------------- */
nexus.draw = function() {

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
}

