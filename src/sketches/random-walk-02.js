var nx = nexus
  , top, btm;

/* Setup
  --------------------------------------------------- */
nx.setup = function() {

  //init arrays with int zero for all values
  btm = nx.range(20).map(function () { return 0 });
  top = nx.range(20).map(function () { return 0 });
}

/* Update
  --------------------------------------------------- */
nx.update = function() {

    
}

/* Draw
  --------------------------------------------------- */
nx.draw = function() {

  var topIx = Math.floor(Math.random() * top.length);
  var btmIx = Math.floor(Math.random() * btm.length);

  top[topIx]++;
  btm[btmIx]++;
    
  topWidth = nx.width/top.length;
  btmWidth = nx.width/btm.length;

  for(var x = 0; x < top.length; x++) {
    nx.fillRect(x*topWidth, 0, topWidth-1, top[x]);
    nx.fillStyle = '#fff';
    nx.fill();
  }

  for(var x = 0; x < btm.length; x++) {
    nx.fillRect(x*btmWidth, nx.height-btm[x], btmWidth-1, btm[x]);
    nx.fillStyle = '#fff';
    nx.fill();
  }
}
