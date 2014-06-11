$video = $('video');

$video[0].play();

$video.on('ended', function() { //loops video
  this.currentTime = 1;
  this.play();
});

