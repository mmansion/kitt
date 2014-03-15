require(['jquery', 'classes/Coords'], function($, Coords) {

  var canvas  = document.getElementById('sketch'),
      ctx     = canvas.getContext('2d'),
      coords  = new Coords(),
      image   = new Image();


    canvas.width = $(window).width();
    canvas.height = $(window).height();
    window.resize = function() {
      canvas.width = $(window).width();
      canvas.height = $(window).height();
    }


    image.src = 'sketches/data/penguin.jpeg';

    /*

    Pixel Manipulation

    exploring the drawImage() method

    The drawImage() method draws an image, referred to as the source image (s), 
    into a canvas, referred to as the destination canvas (d). 

    The drawImage() method can take three different argument sets: 
    
    drawImage( image, dx, dy) 
    drawImage( image, dx, dy, dw, dh) 
    drawImage( image, sx, sy, sw, sh, dx, dy, dw, dh)

    */

    image.onload = function(e) {
      // d =>  destination canvas | s = > source image
      
      var dx = canvas.width/2 - 150,
          dy = canvas.height/2 - 226, 

          dw = 300,  //translated size to destination canvas
          dh = 452, 

          sx = 0, 
          sy = 0,

          //full size of original image 
          sw = 1500, 
          sh = 2258;

      //argument options, uncomment to test them out
      
      //ctx.drawImage(image,  dx, dy);

      //ctx.drawImage(image, dx,  dy, dw, dh);

      ctx.drawImage(image,  sx, sy, sw, sh, dx, dy, dw, dh);
    }
});


