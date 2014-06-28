/* Setup
  --------------------------------------------------- */
nx.setup = function() {

}

/* Update
  --------------------------------------------------- */
nx.update = function() {

} 

/* Draw
  --------------------------------------------------- */
nx.draw = function() {

  nx.bg();
  nx.fill('green');
  nx.noStroke();
  nx.drawCenter();
  nx.rect(400, 400, 200, 200, 30);

  nx.noFill();
  nx.stroke('red');
  nx.rect(500, 200, 100, 100, 20);
}