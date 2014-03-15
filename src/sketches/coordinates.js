require(['jquery', 'classes/Coords'], function($, Coords) {

  var canvas  = document.getElementById('sketch'),
      ctx     = canvas.getContext('2d'),
      coords  = new Coords(),
      radius  = 20;

    canvas.width = $(window).width();
    canvas.height = $(window).height();
    window.resize = function() {
      canvas.width = $(window).width();
      canvas.height = $(window).height();
    }

    ctx.fillStyle = '#fff';
    ctx.font="12px Telex";
    ctx.fillText('x: '+canvas.width/2 +' y: '+canvas.height/2, canvas.width/2+28, canvas.height/2);
    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.arc(canvas.width/2, canvas.height/2, radius, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#003300';
    ctx.stroke();

    $(window).mousemove(function(e) {
      var canvasCoords = coords.windowToCanvas(canvas, e.clientX, e.clientY);

      ctx.fillStyle = '#011722';
      ctx.fillRect(0, 0, canvas.width, canvas.height);  // now fill the canvas
      ctx.fillStyle = '#fff';
      ctx.font="14px Telex";
      ctx.fillText('x: ' + canvasCoords.x + ' y: ' + canvasCoords.y, canvasCoords.x + 28, canvasCoords.y);
      ctx.beginPath();
      ctx.fillStyle = 'green';
      ctx.arc(canvasCoords.x, canvasCoords.y, radius, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.lineWidth = 5;
      ctx.strokeStyle = '#003300';
      ctx.stroke();
    });
});