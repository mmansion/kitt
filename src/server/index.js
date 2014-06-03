var fs   = require('fs'),
    http = require('http'),
    url  = require('url'),
    path = require('path');

var indexPage, movie_webm, movie_mp4, movie_ogg;

module.exports = { 

  start: function(root) {

    http.createServer(function (req, res) {

      console.log(req);

      var reqResource = url.parse(req.url).pathname;
      //console.log("Resource: " + reqResource);

      if(reqResource == "/sandbox/video-server-test.html"){

        fs.readFile(path.resolve(root, "sandbox/video-server-test.html"), function (err, data) {

          console.log("loaded resource");
          if (err) {
              throw err;
          }
          indexPage = data;    
        //console.log(req.headers)
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(indexPage);
        res.end();
      });
      

      } else if (reqResource == "/favicon.ico"){
      
        res.writeHead(404);
        res.end();
      
      } else {

        console.log("herhlskjdf;laksjdf;lkasjdf;lkasjdf;laskj");

        var total;
        
      
        if(reqResource == "/spaceships.webm") {

          fs.readFile(path.resolve(root, "sandbox/spaceships.webm"), function (err, data) {

          if (err) throw err;
          movie_webm = data;

          total = movie_webm.length;

          console.log(total);

          var range = req.headers.range;

          console.log(range);
          return;
          var positions = range.replace(/bytes=/, "").split("-");
          var start = parseInt(positions[0], 10);

          // if last byte position is not present then it is the last byte of the video file.
          var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
          var chunksize = (end-start)+1;

         if(reqResource == "/spaceships.webm") {
              res.writeHead(206, { "Content-Range": "bytes " + start + "-" + end + "/" + total, 
                                   "Accept-Ranges": "bytes",
                                   "Content-Length": chunksize,
                                   "Content-Type":"video/webm"});
              res.end(movie_webm.slice(start, end+1), "binary");

            }

          });
        } 
            
      }
    }).listen(9999); 
        
  }
}





// fs.readFile(path.resolve(__dirname,"movie.mp4"), function (err, data) {
//     if (err) {
//         throw err;
//     }
//     movie_mp4 = data;
// });
// fs.readFile(path.resolve(__dirname,"movie.ogg"), function (err, data) {
//     if (err) {
//         throw err;
//     }
//     movie_ogg = data;
// });

