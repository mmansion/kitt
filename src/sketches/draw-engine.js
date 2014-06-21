//TODO: migrate to new format

// require(['jquery', 'classes/DrawEngine'], function($, DrawEngine) {

//   var canvas      = document.getElementById('sketch'),
//       ctx         = canvas.getContext('2d'),
//       drawEngine  = new DrawEngine();

//     canvas.width = $(window).width();
//     canvas.height = $(window).height();

//     ctx.font = 'bold 50px Arial';

//     drawEngine.start(function(time) {
//       ctx.fillStyle = '#011722';
//       ctx.fillRect(0, 0, canvas.width, canvas.height);  // now fill the canvas
//       ctx.fillStyle = '#fff';
//       ctx.fillText(time, canvas.width/2-200, canvas.height/2-25);
//     });
// });

var nx = nexus;
var c;

/* Setup
  --------------------------------------------------- */
nexus.setup = function() {
  //c = nx.getContext();

  nx.font = 'bold 50px Arial';
}

/* Update
  --------------------------------------------------- */
nexus.update = function() {
  //console.log(nexus.engine.getTime());

  //console.log(nexus.engine.getFps());
}


/* Draw
  --------------------------------------------------- */
nexus.draw = function() {
  nx.bg();

  nx.fillStyle = '#fff';
  //c.fillStyle = nx.fillStyle;


  // c.fillText(String(nx.engine.getTime()), nx.width/2, nx.height/2);
  // c.beginPath();


  nx.fillStyle = '#fff';

  nx.fillText(String(nx.engine.getTime()), nx.width/2, nx.height/2);
  nx.beginPath();

}