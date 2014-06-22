var nx        = nexus
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

  nx.strokeStyle = '#fff';
  nx.fillStyle = '#fff';
}

/* Update
  --------------------------------------------------- */
nexus.update = function() {

  //update loop
}


/* Draw
  --------------------------------------------------- */
nexus.draw = function() {

  nx.bg(); //draw baground

  deg += 2;

  if(deg >= 360) {
    deg = 1;
    clockwise = !clockwise;
  }

  radStart = deg * (Math.PI/180);

  nx.beginPath();

  nx.arc(nexus.width/2, nexus.height/2, 150,  radStart, Math.PI*2,  clockwise);
  nx.arc(nexus.width/2, nexus.height/2, 130,  radStart, Math.PI*2,  clockwise);
  nx.arc(nexus.width/2, nexus.height/2, 110,  radStart, Math.PI*2,  clockwise);
  nx.arc(nexus.width/2, nexus.height/2, 90,   radStart, Math.PI*2,  clockwise);
  nx.arc(nexus.width/2, nexus.height/2, 70,   radStart, Math.PI*2,  clockwise);
  nx.arc(nexus.width/2, nexus.height/2, 50,   radStart, Math.PI*2,  clockwise);
  nx.arc(nexus.width/2, nexus.height/2, 30,   radStart, Math.PI*2,  clockwise);
  nx.arc(nexus.width/2, nexus.height/2, 10,   radStart, Math.PI*2,  clockwise);

  nx.stroke();
  
  if( + new Date - lastRun > delay) {
    lastRun = + new Date;
  }
}