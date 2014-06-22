var nx = nexus;
var c;

/* Setup
  --------------------------------------------------- */
nexus.setup = function() {
  //c = nx.getContext();

  nx.font = 'bold 50px Arial';

  console.log(nx);
}

/* Update
  --------------------------------------------------- */
nexus.update = function() {

  //console.log(nexus.getTime());

  //console.log(nexus.getFps());
}


/* Draw
  --------------------------------------------------- */
nexus.draw = function() {
  nx.bg();

  nx.fillStyle = '#fff';
  nx.fillText(String(nx.getTime()), nx.width/2, nx.height/2);
  nx.beginPath();
}