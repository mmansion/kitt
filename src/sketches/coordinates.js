var c       //2d context
  , r = 20  //radius
  , x       //mouse x
  , y;      //mouse y

/* Setup
  --------------------------------------------------- */
nexus.setup = function() {
  c = nexus.getContext();
  
  c.font="12px Telex";
}

/* Update
  --------------------------------------------------- */
nexus.update = function() {

  x = (nexus.mouseX !== 0) ? nexus.mouseX: nexus.canvas.width/2;
  y = (nexus.mouseY !== 0) ? nexus.mouseY: nexus.canvas.height/2;
}

/* Draw
  --------------------------------------------------- */
nexus.draw = function() {

  nexus.bg();

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