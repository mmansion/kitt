var radius = 70
  , nx     = nexus;

/* Setup
  --------------------------------------------------- */
nexus.setup = function() {

}

/* Update
  --------------------------------------------------- */
nexus.update = function() {

} 

/* Draw
  --------------------------------------------------- */
nexus.draw = function() {

  nx.bg();

  nx.fillStyle = 'green';
  nx.fill();
  nx.strokeStyle = '#003300';
  nx.stroke();

  nx.ellipse(nx.mouseX, nx.mouseY, 150, 150, true);
}