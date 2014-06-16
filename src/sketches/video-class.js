var c
  , video1
  , video2
  , video3
  , video4
  , delay   = 60
  , lastRun = + new Date;

/* Setup
  --------------------------------------------------- */
nexus.setup = function() {

  c = nexus.canvas.getContext('2d');

  video1 = new nexus.Video('sketches/data/spaceships.webm');

  video2 = new nexus.Video('sketches/data/spaceships.webm');

  video3 = new nexus.Video('sketches/data/spaceships.webm');

  video4 = new nexus.Video('sketches/data/spaceships.webm');

}

/* Update
  --------------------------------------------------- */
nexus.update = function() {

}


/* Draw
  --------------------------------------------------- */
nexus.draw = function() {



  if( + new Date - lastRun > delay) {

    lastRun = + new Date;

    video1.draw(200,100);
    video2.draw(800, 200);
    video3.draw(1000, 600);
    video4.draw(400, 900);
  }

}
