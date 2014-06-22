var nx = nexus
  , img;

/* Setup
  --------------------------------------------------- */
nexus.setup = function() {
  img        = new Image();
  img.onload = drawImage;
  img.src    = 'sketches/data/penguin.jpeg';
}

/*
The drawImage() method draws an image, referred to as the source image (s), 
into a canvas, referred to as the destination canvas (d). 

The drawImage() method can take three different argument sets: 

drawImage( image, dx, dy) 
drawImage( image, dx, dy, dw, dh) 
drawImage( image, sx, sy, sw, sh, dx, dy, dw, dh)
*/

function drawImage() {
  // d =>  destination canvas | s = > source image

  var imageData = {},
      dx = nx.width/2 - 150, //centering
      dy = nx.height/2 - 226, 

      dw = 300,  //translated size to destination canvas
      dh = 452, 

      sx = 0, 
      sy = 0,

      //full size of original image 
      sw = 1500, 
      sh = 2258;

    //argument options, uncomment to test them out
    
    //nx.drawImage(image,  dx, dy);
    //nx.drawImage(image, dx,  dy, dw, dh);

    nx.drawImage(img,  sx, sy, sw, sh, dx, dy, dw, dh);

    imageData = nx.getImageData(dx, dy, dw, dh);

    nx.bg();

    //nexus.putImageData(imageData, dx, dy);

    var pixel = 0
      , pixelX = dx
      , pixelY = dy;


    //ref: http://stackoverflow.com/questions/4899799/whats-the-best-way-to-set-a-single-pixel-in-an-html5-canvas

    var id = nx.createImageData(1,1)
      , d  = id.data;

    var pixelPrinter = setInterval(function() {

      if(pixel < imageData.data.length) {

        d[0] = imageData.data[pixel];
        d[1] = imageData.data[pixel+1];
        d[2] = imageData.data[pixel+2];
        d[3] = imageData.data[pixel+3];

        nx.putImageData(id, pixelX, pixelY);

        pixel += 4;
        pixelX++;
      
      if(pixelX >= dx + dw) {
        pixelX = dx;
        pixelY++;
      }

    } else {
      clearInterval(pixelPrinter);
    }

  }, 0);
}

