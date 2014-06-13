var c
  , video1;

/* Setup
  --------------------------------------------------- */
nexus.setup = function() {

  c = nexus.canvas.getContext('2d');

  video1 = new nexus.Video('sketches/data/spaceships.webm');

}

/* Update
  --------------------------------------------------- */
nexus.update = function() {

}


/* Draw
  --------------------------------------------------- */
nexus.draw = function() {

  video1.draw(0,0);
}
