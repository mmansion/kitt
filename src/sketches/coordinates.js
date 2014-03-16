var c       //2d context
  , r = 20  //radius
  , x       //mouse x
  , y;      //mouse y

/* Setup
  --------------------------------------------------- */
kitt.setup = function() {
  c = kitt.canvas.getContext('2d');
  
  c.font="12px Telex";

  x = kitt.canvas.width/2;
  y = kitt.canvas.height/2;
}

/* Update
  --------------------------------------------------- */
kitt.update = function() {
  //on update
}


/* Draw
  --------------------------------------------------- */
kitt.draw = function() {
  c.fillStyle = '#011722';
  c.fillRect(0, 0, kitt.canvas.width, kitt.canvas.height);  // now fill the canvas
  c.fillStyle = '#fff';
  c.fillText('x: ' + x + ' y: ' + y, x + 28, y);
  c.beginPath();
  c.fillStyle = 'green';
  c.arc(x, y, r, 0, 2 * Math.PI, false);
  c.fill();
  c.lineWidth = 5;
  c.strokeStyle = '#003300';
  c.stroke();
}

window.onmousemove = function(e) {
  var canvasCoords = kitt.coords.windowToCanvas(kitt.canvas, e.clientX, e.clientY);

  x = canvasCoords.x;
  y = canvasCoords.y;
}