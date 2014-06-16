var c       //2d context
  , r = 20  //radius
  , x       //mouse x
  , y;      //mouse y

/* Setup
  --------------------------------------------------- */
nexus.setup = function() {
  c = nexus.canvas.context2D;
  
  c.font="12px Telex";

  x = nexus.canvas.width/2;
  y = nexus.canvas.height/2;
}

/* Update
  --------------------------------------------------- */
nexus.update = function() {
  //on update
}


/* Draw
  --------------------------------------------------- */
nexus.draw = function() {

  nexus.canvas.background('#011722');

  //c.fillStyle = '#011722';
  //c.fillRect(0, 0, nexus.canvas.width, nexus.canvas.height);  // now fill the canvas
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
  var canvasCoords = nexus.coords.windowToCanvas(nexus.canvas, e.clientX, e.clientY);

  x = canvasCoords.x;
  y = canvasCoords.y;
}