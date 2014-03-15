//TODO: migrate to new format

require(['jquery', 'classes/DrawEngine'], function($, DrawEngine) {

  var canvas      = document.getElementById('sketch'),
      ctx         = canvas.getContext('2d'),
      drawEngine  = new DrawEngine();

    canvas.width = $(window).width();
    canvas.height = $(window).height();

    ctx.font = 'bold 50px Arial';

    drawEngine.start(function(time) {
      ctx.fillStyle = '#011722';
      ctx.fillRect(0, 0, canvas.width, canvas.height);  // now fill the canvas
      ctx.fillStyle = '#fff';
      ctx.fillText(time, canvas.width/2-200, canvas.height/2-25);
    });
});