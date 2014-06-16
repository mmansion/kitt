var canvas    = nexus.canvas
  , lastRun   = + new Date
  , delay     = 10
  , clockwise = true
  , radStart  = 0
  , radEnd    = 0
  , deg = 0
  , c;


/* Setup
  --------------------------------------------------- */
nexus.setup = function() {
  canvas = nexus.canvas;
  c = nexus.canvas.getContext('2d');


  c.strokeStyle = '#fff';
  c.fillStyle = '#fff';
}

/* Update
  --------------------------------------------------- */
nexus.update = function() {

  //update loop
}


/* Draw
  --------------------------------------------------- */
nexus.draw = function() {
  deg+=2;

  if(deg == 360) {
    deg = 1;
    clockwise = !clockwise;
  }

  radStart = deg * (Math.PI/180);

  c.beginPath();

  //context.arc(x,y,r,sAngle,eAngle,counterclockwise)
  c.arc(canvas.width/2, canvas.height/2, 90,  radStart, Math.PI*2,  clockwise);
  c.arc(canvas.width/2, canvas.height/2, 70,  radStart, Math.PI*2,  clockwise);
  c.arc(canvas.width/2, canvas.height/2, 50,  radStart, Math.PI*2,  clockwise);
  c.arc(canvas.width/2, canvas.height/2, 30,  radStart, Math.PI*2,  clockwise);
  c.arc(canvas.width/2, canvas.height/2, 10,  radStart, Math.PI*2,  clockwise);

  c.stroke();
  
  if( + new Date - lastRun > delay) {
    lastRun = + new Date;
  }
}