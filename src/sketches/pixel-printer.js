var c
  , img;

/* Setup
  --------------------------------------------------- */
nexus.setup = function() {
  c = nexus.getContext();

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
      dx = nexus.canvas.width/2 - 150, //centering
      dy = nexus.canvas.height/2 - 226, 

      dw = 300,  //translated size to destination canvas
      dh = 452, 

      sx = 0, 
      sy = 0,

      //full size of original image 
      sw = 1500, 
      sh = 2258;

    //argument options, uncomment to test them out
    
    //c.drawImage(image,  dx, dy);

    //c.drawImage(image, dx,  dy, dw, dh);

    c.drawImage(img,  sx, sy, sw, sh, dx, dy, dw, dh);

    imageData = c.getImageData(dx, dy, dw, dh);

    c.clearRect(0, 0, nexus.canvas.width, nexus.canvas.height);

    //c.putImageData(imageData, dx, dy);

    var pixel = 0
      , pixelX = dx
      , pixelY = dy;


    //ref: http://stackoverflow.com/questions/4899799/whats-the-best-way-to-set-a-single-pixel-in-an-html5-canvas

    var id = c.createImageData(1,1)
      , d = id.data;

    var pixelPrinter = setInterval(function() {

      if(pixel < imageData.data.length) {

        d[0] = imageData.data[pixel];
        d[1] = imageData.data[pixel+1];
        d[2] = imageData.data[pixel+2];
        d[3] = imageData.data[pixel+3];

        c.putImageData(id, pixelX, pixelY);

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

