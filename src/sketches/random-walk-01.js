var lastRun = + new Date
  , delay   = 10000
  , walker
  , nx = nexus;

/* Setup
  --------------------------------------------------- */
nx.setup = function() {
  walker = new Walker();
}

/* Update
  --------------------------------------------------- */
nx.update = function() {
  
}

/* Draw
  --------------------------------------------------- */
nx.draw = function() {

  walker.display();
  
  walker.walk();

  if( + new Date - lastRun > delay) {
    lastRun = + new Date;  
    walker.anomaly();    
  }
}


var Walker = function() {
  var _x = nx.width/2
    , _y = nx.width/2;

  nx.strokeStyle = "#fff";
  nx.beginPath();
  nx.moveTo(_x,_y);

  this.x = function(x) {
    if(x) {
      _x = x;
    } else {
      return _x;
    }
  };

  this.y = function(y) {
    if(y) {
      _y = y;
    } else {
      return _y;
    }
  };
}

Walker.prototype = {

  display: function() { 
    nx.lineTo(this.x(),this.y());
    nx.stroke();
  },

  walk: function() {
    this.x(this.x() + this.getRandomInt(-4,4));
    this.y(this.y() + this.getRandomInt(-4,4));
  },

  anomaly: function() {
    this.x(this.x() + this.getRandomInt(-100,100));
    this.y(this.y() + this.getRandomInt(-100,100));
  },

  getRandomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
};