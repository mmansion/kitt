var nx = nexus;

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

  for(var i = 0; i < 100; i++) {
    var x = i*2;

    nx.fillStyle = '#ccddff';
    nx.beginPath();
    nx.moveTo(nx.centerX+x,nx.centerY+x);
    nx.lineTo(250+x,50);
    nx.lineTo(200+x,80);
    nx.closePath();
    nx.fill();
    nx.strokeStyle = 'rgb(0,128,0)';
    nx.lineWidth = 1;
    nx.stroke();
  }
}





    

    
