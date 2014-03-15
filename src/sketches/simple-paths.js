require(['jquery', 'classes/Coords'], function($, Coords) {

  var canvas  = document.getElementById('sketch'),
      ctx     = canvas.getContext('2d'),
      coords  = new Coords();

    canvas.width = $(window).width();
    canvas.height = $(window).height();
    window.resize = function() {
      canvas.width = $(window).width();
      canvas.height = $(window).height();
    }

    console.log("sketch loaded");


    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;

    for(var i = 0; i < 100; i++) {
      var x = i*2;

      ctx.fillStyle = '#ccddff';
      ctx.beginPath();
      ctx.moveTo(centerX+x,centerY+x);
      ctx.lineTo(250+x,50);
      ctx.lineTo(200+x,80);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = 'rgb(0,128,0)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    
  
});