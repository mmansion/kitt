var canvas
  , lastRun   = + new Date
  , delay     = 100
  , clockwise = true
  , radStart  = 0
  , radEnd    = 0
  , deg = 0
  , c;

/* Setup
  --------------------------------------------------- */
kitt.setup = function() {
  canvas = this.canvas;
  c = canvas.getContext('2d');

  canvas.width  = $(window).width();
  canvas.height = $(window).height();


  c.strokeStyle = '#fff';
  c.fillStyle = '#fff';
}

/* Update
  --------------------------------------------------- */
kitt.update = function() {

  //update loop
}


/* Draw
  --------------------------------------------------- */
kitt.draw = function() {
  deg++;

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