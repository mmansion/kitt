$video = $('video');

$video[0].play();

$video.on('ended', function(){
  console.log("video has ended");
  console.log(this);
  this.currentTime = 1;
  console.log(this.currentTime);
  this.play();
});

